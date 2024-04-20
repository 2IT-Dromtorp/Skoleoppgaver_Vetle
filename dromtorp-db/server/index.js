const express = require("express");
const app = express();
app.use(express.static("./dist"));
app.use(express.json());

const { MongoClient, ObjectId } = require("mongodb");
const path = require("node:path");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 8080;

async function getCollection(collection) {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
    const db = client.db("dromtorp");
    return db.collection(collection);
}

function verifyToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });
    try {
        const decoded = jwt.verify(token, "bbop");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    (async () => {
        const users = await getCollection("users");
        const allUsers = await users.find({}).toArray();
        if (allUsers.length > 0) return;
        await users.insertOne({
            loginName: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
            salt: "",
            authority: 5,
        });
    })();

    app.get("/api/test", (req, res) => {
        res.status(200).json({ message: "👍" });
    });

    app.post("/api/login", async (req, res) => {
        try {
            const collection = await getCollection("users");

            const { username, password } = req.body;

            const user = await collection.findOne({ loginName: username });
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "Could not find a user" });
            }

            const passwordMatch = password == user.password ? true : false;
            if (!passwordMatch) {
                return res.status(401).json({ message: "Wrong password" });
            }

            const token = jwt.sign({ userId: user._id }, "bbop", {
                expiresIn: "2d",
            });

            res.status(200).json({
                message: "Authentication successful",
                jwt: token,
            });
        } catch (err) {
            res.status(500).json({ message: `Login failed: ${err}` });
        }
    });

    app.get("/api/checkAuthority", verifyToken, async (req, res) => {
        const users = await getCollection("users");

        const authority = await users.find({}).toArray();

        console.log(authority);
        console.log(req.query.requiredAuthority);

        const result = authority
            ? authority.authority == req.query.requiredAuthority
                ? true
                : false
            : false;

        res.status(200).json({ message: "👍", result: result });
    });

    app.post("/api/addStudent", verifyToken, async (req, res) => {
        console.log(req.body);

        try {
            const collection = await getCollection("elever");
            await collection.insertOne(req.body);
            res.status(200).json({ message: "Student added" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: `Failed to add student: ${err}` });
        }
    });

    app.post("/api/addUser", verifyToken, async (req, res) => {
        console.log(req.body);

        try {
            const collection = await getCollection("users");
            await collection.insertOne({
                ...req.body /*, password: Hash(req.body.password)*/,
            });
            res.status(200).json({ message: "Student added" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: `Failed to add user: ${err}` });
        }
    });

    app.post("/api/addEquipment", verifyToken, async (req, res) => {
        try {
            const collection = await getCollection("utstyr");
            await collection.insertOne({
                name: req.body.name,
                available: true,
                burrowRequesters: [],
            });
            res.status(200).json({ message: "Equipment added" });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: `Failed to add equipment: ${err}`,
            });
        }
    });

    app.get("/api/getAllEquipment", verifyToken, async (req, res) => {
        try {
            const collection = await getCollection("utstyr");

            const equipment = await collection.find({}).toArray();

            res.status(200).json(equipment);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: `Failed to get equipment: ${err}`,
            });
        }
    });

    app.put("/api/burrowRequest", verifyToken, async (req, res) => {
        try {
            const burrowRequests = await getCollection("requests");
            const equipment = await getCollection("utstyr");

            const request = {
                date: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
                student: {
                    $ref: "elever",
                    $id: new ObjectId(req.userId),
                    $db: "dromtorp",
                },
                equipment: {
                    $ref: "utstyr",
                    $id: new ObjectId(req.body.equipment),
                    $db: "dromtorp",
                },
            };

            await burrowRequests.insertOne(request);

            await equipment.updateOne(
                { _id: new ObjectId(req.body.equipment) },
                { $push: { burrowRequesters: req.userId } }
            );

            res.status(200).json({
                message: "Succesfully added a burrow request",
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: `Failed to add burrow request: ${err}`,
            });
        }
    });

    app.get("/api/whoami", verifyToken, async (req, res) => {
        try {
            const users = await getCollection("users");

            const user = await users.findOne(
                { _id: new ObjectId(req.userId) },
                { projection: { password: 0 } }
            );

            if (user == null) {
                return res
                    .status(401)
                    .json({ message: "Could not authenticate user" });
            }

            return res.status(200).json(user);
        } catch (err) {
            return res
                .status(500)
                .json({ message: `Ann error occured: ${err}` });
        }
    });

    app.get("/*", (req, res) => {
        res.status(200).sendFile(path.resolve("./dist/index.html"));
    });
});
