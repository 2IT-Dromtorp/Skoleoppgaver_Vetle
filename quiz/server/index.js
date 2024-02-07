const secondsToAnswer = 10;


const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("dist"));

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const path = require("node:path");

const mongoClient = require("mongodb").MongoClient;

const port = process.env.PORT || 8080;
const url = "mongodb+srv://Vetle:Skole123@oppgaver.jp9p8ow.mongodb.net/";


server.listen(port, async () => {
    const mongodb = await mongoClient.connect(url);
    const db = mongodb.db("questions_db");
    const oppgaver = db.collection("questions");
    
    const questions = await oppgaver.find({}).project({_id: 0}).toArray()

    app.get("/api/question", (req, res) => {
        const randomQuestion = questions.splice(Math.random() * questions.length, 1)[0]
        res.status(200).json({"question": randomQuestion})
    })

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("./dist/index.html"));
    });
})

function handleTimer() {
    clientConnected = true
    setTimeout(() => {
        clientConnected = false
    }, secondsToAnswer * 1000)
}

let host;
let clientConnected;

io.on("connection", (client) => {

    client.on("host", () => {
        host = client;
    });
    client.on("client", (name) => {
        if (clientConnected || !host) return
        host.emit("client connected", name)
        handleTimer()
    });
    client.on("answer changed", (value) => {
        if (!host) return;
        host.emit("answer changed", value);
    });
})