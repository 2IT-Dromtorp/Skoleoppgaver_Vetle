const express = require("express")
const app = express()
const path = require("node:path")
const mongoClient = require("mongodb").MongoClient

const port = process.env.PORT || 8080
const url = "mongodb+srv://thughunters:Skole123@oppgaver.jp9p8ow.mongodb.net/"

app.use(express.json())
app.use(express.static("dist"))

app.listen(port, async () => {
    const mongodb = await mongoClient.connect(url)
    const db = mongodb.db("oppgaver_db")
    const oppgaver = db.collection("oppgaver")

    app.get("*", (req, res) => {
        res.sendFile(path.resolve("./dist/index.html"))
    })
})