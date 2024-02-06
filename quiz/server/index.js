const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static("dist"))

const http = require("http")
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)

const path = require("node:path")

const mongoClient = require("mongodb").MongoClient


const port = process.env.PORT || 8080
const url = "mongodb+srv://Vetle:Skole123@oppgaver.jp9p8ow.mongodb.net/"


server.listen(port, async () => {
    const mongodb = await mongoClient.connect(url)
    const db = mongodb.db("oppgaver_db")
    const oppgaver = db.collection("oppgaver")

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("./dist/index.html"))
    })
})

io.on("connection", (client) => {
    console.log("Client connected")
    io.on("disconnecting", () => {
        console.log("Client disconnected")
    })
})