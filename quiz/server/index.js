const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("dist"));

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const path = require("node:path");

const { MongoClient } = require("mongodb");
const url = "mongodb+srv://Vetle:Skole123@questions.jp9p8ow.mongodb.net/";

const port = process.env.PORT || 8080;

server.listen(port, async () => {
    console.log(`Server running on port ${port}`)
    const mongodb = await MongoClient.connect(url);
    const db = mongodb.db("questions_db");
    const questions = db.collection("questions");
    const users = db.collection("brukere");

    const allQuestion = await questions.find({}).project({ _id: 0 }).toArray();

    const remainingQuestions = [];

    for (let i = 0; i < 10; i++) {
        remainingQuestions.push(
            allQuestion.pop([Math.floor(Math.random() * allQuestion.length)])
        );
    }

    app.get("/api/question", (req, res) => {
        clientConnected = false;
        const randomQuestion = remainingQuestions.splice(
            Math.random() * remainingQuestions.length,
            1
        )[0];
        res.status(200).json({ question: randomQuestion });
    });

    app.post("/api/point", async (req, res) => {
        const user = await users.findOne({ name: req.body.name });
        if (user) {
            await users.updateOne(
                { name: req.body.name },
                { $inc: { points: req.body.value } }
            );
        } else {
            await users.insertOne({
                name: req.body.name,
                points: 0 + req.body.value,
            });
        }
        res.status(200).json({ message: "Point added" });
    });

    app.post("/api/createQuestion", async (req, res) => {
        await questions.insertOne(req.body);

        res.status(200).json({ message: "Question added" });
    });

    app.get("/api/getLeaderboard", async (req, res) => {
        const leaderboard = await users.find({}).project({ _id: 0 }).toArray();

        leaderboard.sort((a, b) => a.points - b.points).reverse();

        res.status(200).json(leaderboard);
    });

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("./dist/index.html"));
    });

    let host = undefined;
    let clientConnected = false;

    io.on("connection", (client) => {
        client.on("host", () => {
            if (host) return;
            host = client;
        });

        client.on("client", (name) => {
            if (clientConnected || !host) {
                client.emit("too slow");
                return;
            }
            client.emit("answer");
            host.emit("client connected", name);
            clientConnected = true;
        });

        client.on("done answering", () => {
            io.emit("done answering");
        });

        client.on("answer changed", (value) => {
            if (!host) return;
            host.emit("answer changed", value);
        });

        client.on("disconnecting", () => {
            if (host == client) host = undefined;
        });
    });
});
