const express = require("express");
const path = require("node:path");
const crypto = require("node:crypto");
const { MongoClient } = require("mongodb");
const { check, validationResult } = require("express-validator");

const app = express();
app.use(express.static(path.resolve("./build")));
app.use(express.json());

const PORT = process.env.PORT || 8080;
const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminUsername || !adminPassword) {
    console.error("Missing env variables ADMIN_USERNAME and/or ADMIN_PASSWORD");
    process.exit(1);
}

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("eksamen");
    const users = db.collection("users");
    const sports = db.collection("sports");
    const tournaments = db.collection("tournaments");
    const requests = db.collection("requests");

    await insertDefaultUserIfNotExists(users);

    app.get("/api/login", (req, res) => {
        const username = req.query.username;
        const password = req.query.password;
        const user = users.findOne({ username, password: crypto.createHash("sha256").update(password).digest("hex") });
        if (!user) return res.status(401).send("Invalid username or password");
        return res.status(200).send("Login successful");
    });

    app.get("/api/sports", async (req, res) => {
        const allSports = await sports.find({}).toArray();
        return res.status(200).json(allSports);
    });

    app.get("/api/tournaments", async (req, res) => {
        const allTournaments = await tournaments.find({}).toArray();
        allTournaments = allTournaments.sort((a) => a.members);
        return res.status(200).json(allTournaments);
    });

    app.get("/api/requests", async (req, res) => {
        const allRequests = await requests.find({}).toArray();
        return res.status(200).json(allRequests);
    });

    app.post("/api/sport", async (req, res) => {
        const sport = req.body;
        await sports.insertOne(sport);
        return res.status(201).send("Sport created");
    });

    app.post("/api/tournament", async (req, res) => {
        const tournament = req.body;
        await tournaments.insertOne(tournament);
        return res.status(201).send("Tournament created");
    });

    app.post("/api/join-sport", async (req, res) => {
        const { sport, name, email } = req.body;
        await requests.updateOne({ sport, name, email }, { $setOnInsert: { sport, name, email } }, { upsert: true });
        return res.status(201).send("Request sent");
    });

    app.post("/api/accept-request", async (req, res) => {
        const { id } = req.body;
        const sport = await requests.findOneAndDelete({ _id: id });
        await sports.updateOne({ _id: sport._id }, { $inc: { members: 1 } });
        return res.status(200).send("Request accepted");
    });

    app.post("/api/decline-request", async (req, res) => {
        const { id } = req.body;
        await requests.deleteOne({ _id: id });
        return res.status(200).send("Request declined");
    });

    app.get("/*", (req, res) => {
        res.sendFile(path.resolve("./build/index.html"));
    });

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
