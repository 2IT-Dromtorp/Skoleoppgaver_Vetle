const express = require("express");
const app = express();
app.use(express.static("./dist"));
app.use(express.json());

const { MongoClient } = require("mongodb");

const path = require("node:path");

const PORT = process.env.PORT || 8080;

async function getCollection(collection) {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("dromtorp");
    return db.collection(collection);
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    app.get("/api/test", (req, res) => {
        res.status(200).json({ message: "👍" });
    });

    app.post("/api/login", (req, res) => {
        res.status(200).json({ message: "👍" });
    });

    app.post("/api/register", (req, res) => {
        res.status(200).json({ message: "👍" });
    });

    app.post("/api/addStudent", async (req, res) => {
        console.log(req.body);

        const collection = await getCollection("elever")

        try {
            await collection.insertOne(req.body)
            res.status(200).json({ message: "Student added" });
        } catch (err) {
            console.error(err)
            res.status(400).json({"message": `Failed to add student: ${err}`})
        }
    });

    app.get("/*", (req, res) => {
        res.status(200).sendFile(path.resolve("./dist/index.html"));
    });
});
