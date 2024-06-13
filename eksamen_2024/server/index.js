const express = require("express");
const path = require("node:path");
const crypto = require("node:crypto");
const { MongoClient, ObjectId } = require("mongodb");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.static(path.resolve("./build")));
app.use(express.json());

const PORT = process.env.PORT || 8080;
const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const googleToken = process.env.GOOGLE_TOKEN;
const mongoUrl = process.env.MONGO_URL;

if (!adminUsername || !adminPassword || !accessTokenSecret || !googleToken || !mongoUrl) {
    console.error(
        "Missing env variables ADMIN_USERNAME and/or ADMIN_PASSWORD and/or ACCESS_TOKEN_SECRET and/or GOOGLE_TOKEN and/or MONGO_URL"
    );
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "vetle.fongen@gmail.com",
        pass: googleToken,
    },
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    const client = new MongoClient(mongoUrl);
    const db = client.db("eksamen");
    const users = db.collection("users");
    const sports = db.collection("sports");
    const tournaments = db.collection("tournaments");
    const requests = db.collection("requests");

    insertDefaultUserIfNotExists(users);

    app.post(
        "/api/login",
        [
            check("username").notEmpty().withMessage("Username is required"),
            check("password").notEmpty().withMessage("Password is required"),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password } = req.body;
            const user = await users.findOne({ username, password: crypto.createHash("sha256").update(password).digest("hex") });
            if (!user) return res.status(401).send("Invalid username or password");

            const accessToken = jwt.sign(user, accessTokenSecret);
            return res.status(200).json(accessToken);
        }
    );

    app.put(
        "/api/change-password",
        [
            check("oldPassword").notEmpty().withMessage("Old password is required"),
            check("newPassword").notEmpty().withMessage("New password is required"),
            authenticateToken,
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { oldPassword, newPassword } = req.body;

            const user = await users.findOne({
                username: req.user.username,
                password: crypto.createHash("sha256").update(oldPassword).digest("hex"),
            });
            if (!user) {
                return res.status(401).send("Invalid old password");
            }

            await users.updateOne(
                { _id: user._id },
                { $set: { password: crypto.createHash("sha256").update(newPassword).digest("hex") } }
            );
            return res.status(200).send("Password changed successfully");
        }
    );

    app.get("/api/check-auth", [authenticateToken], (req, res) => {
        return res.status(200).send(true);
    });

    app.get("/api/sports", async (req, res) => {
        const allSports = await sports.find({}).toArray();
        return res.status(200).json(allSports);
    });

    app.get("/api/tournaments", async (req, res) => {
        let allTournaments = await tournaments.find({}).toArray();
        allTournaments = allTournaments.sort((a) => a.members);
        return res.status(200).json(allTournaments);
    });

    app.get("/api/requests", [authenticateToken], async (req, res) => {
        const allRequests = await requests.find({}).toArray();
        return res.status(200).json(allRequests);
    });

    app.post(
        "/api/sport",
        [
            check("name").notEmpty().withMessage("Name is required"),
            check("description").notEmpty().withMessage("Description is required"),
            authenticateToken,
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, description } = req.body;
            await sports.insertOne({ name, description, members: 0 });
            return res.status(201).send("Sport created");
        }
    );

    app.post(
        "/api/tournament",
        [
            check("sport").notEmpty().withMessage("sport field is required"),
            check("name").notEmpty().withMessage("name field is required"),
            check("date").notEmpty().withMessage("date field is required"),
            check("time").notEmpty().withMessage("time field is required"),
            check("place").notEmpty().withMessage("place field is required"),
            check("skillLevel").notEmpty().withMessage("skillLevel field is required"),
            check("description").notEmpty().withMessage("description field is required"),
            authenticateToken,
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const tournament = req.body;
            await tournaments.insertOne(tournament);
            return res.status(201).send("Tournament created");
        }
    );

    app.post(
        "/api/join-sport",
        [
            check("sport").notEmpty().withMessage("Sport is required"),
            check("name").notEmpty().withMessage("Name is required"),
            check("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { sport, name, email } = req.body;
            await requests.updateOne({ sport, name, email }, { $setOnInsert: { sport, name, email } }, { upsert: true });
            return res.status(201).send("Request sent");
        }
    );

    app.post(
        "/api/accept-request",
        [check("id").notEmpty().withMessage("ID is required"), authenticateToken],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.body;
            const request = await requests.findOneAndDelete({ _id: new ObjectId(id) });
            await sports.updateOne({ _id: new ObjectId(request._id) }, { $inc: { members: 1 } });
            await transporter.sendMail({
                from: "ballil@noreply.com",
                to: request.email,
                subject: "Request accepted",
                text: `Your request to join ${request.sport} has been accepted`,
            });
            return res.status(200).send("Request accepted");
        }
    );

    app.post(
        "/api/decline-request",
        [check("id").notEmpty().withMessage("ID is required"), authenticateToken],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.body;
            const request = await requests.findOneAndDelete({ _id: new ObjectId(id) });
            await transporter.sendMail({
                from: "ballil@noreply.com",
                to: request.email,
                subject: "Request declined",
                text: `Your request to join ${request.sport} has been declined`,
            });
            return res.status(200).send("Request declined");
        }
    );

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("./build/index.html"));
    });

    function authenticateToken(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }

    async function insertDefaultUserIfNotExists(users) {
        await users.updateOne(
            {
                username: adminUsername,
            },
            {
                $setOnInsert: {
                    username: adminUsername,
                    password: crypto.createHash("sha256").update(adminPassword).digest("hex"),
                },
            },
            {
                upsert: true,
            }
        );
    }
});
