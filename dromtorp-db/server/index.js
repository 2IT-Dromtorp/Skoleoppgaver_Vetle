const express = require("express");
const app = express();
app.use(express.static("./dist"));
app.use(express.json());

const { MongoClient, ObjectId } = require("mongodb");
const path = require("node:path");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 8080;

async function getCollection(collection) {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("dromtorp");
    return db.collection(collection);
}

function verifyToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });
    try {
        const decoded = jwt.verify(token, "bbop");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

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
        users = await getCollection("elever");

        const authority = await users.findOne(
            { _id: req.userId },
            { projection: { _id: 0, authority: 1 } }
        );

        console.log(authority);
        console.log(req.query.requiredAuthority);

        const result = authority
            ? authority == req.query.requiredAuthority
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
                burrowed: false,
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

            console.log(equipment);

            res.status(200).json({
                message: "Successfully got equipment",
                data: equipment,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: `Failed to get equipment: ${err}`,
            });
        }
    });

    app.post("/api/burrowRequest", verifyToken, async (req, res) => {
        try {
            const burrowRequests = await getCollection("burrowers");

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
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: `Failed to add burrow request: ${err}`,
            });
        }
    });

    app.get("/*", (req, res) => {
        res.status(200).sendFile(path.resolve("./dist/index.html"));
    });
});
