const secondsToAnswer = 15;


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

const port = process.env.PORT || 8080;
const url = "mongodb+srv://Vetle:Skole123@questions.jp9p8ow.mongodb.net/";


server.listen(port, async () => {
    // const mongodb = await MongoClient.connect(url);
    // const db = mongodb.db("questions_db");
    // const questions = db.collection("questions");
    // const users = db.collection("brukere");
    
    // const remainingQuestions = await questions.find({}).project({_id: 0}).toArray()

    app.get("/api/question", (req, res) => {
        const randomQuestion = remainingQuestions.splice(Math.random() * remainingQuestions.length, 1)[0]
        res.status(200).json({"question": randomQuestion})
    })

    app.post("/api/point", async (req, res) => {
        const user = await users.findOne({name: req.body.name})
        if (user) { 
            await users.updateOne({name: req.body.name}, {$inc: {points: req.body.value}})
        } else {
            await users.insertOne({name: req.body.name, points: 0 + req.body.value})
        }
        res.status(200).json({"message": "👍"})
    })

    app.post("/api/createQuestion", async (req, res) => {
        // await questions.insertOne(req.body)

        res.status(200).json({"message": "👍"})
    })

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("./dist/index.html"));
    });
})

let host;
let clientConnected;
let timeout;

function handleTimer() {
    clientConnected = true;
    timeout = setTimeout(() => {
        clientConnected = false
    }, secondsToAnswer * 1000);
}

io.on("connection", (client) => {

    client.on("host", () => {
        host = client;
    });

    client.on("client", (name) => {
        if (clientConnected || !host) {
            client.emit("too slow");
            return;
        };
        client.emit("answer");
        host.emit("client connected", name);
        handleTimer();
    });

    client.on("correct answer", () => {
        clearTimeout(timeout)
        clientConnected = false
    })

    client.on("answer changed", (value) => {
        if (!host) return;
        host.emit("answer changed", value);
    });
})