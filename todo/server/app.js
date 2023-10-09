const express = require("express")
const fs = require("fs")
const bcrypt = require("bcrypt")
const app = express()

app.use(express.json())

const PORT = 8080

app.listen(PORT, () => console.log("Server started on port", PORT));

app.use(express.static("build"))

app.get("/api/todo", (req, res) => {
    let raw = fs.readFileSync("./todo.json");
    let todoTasks = JSON.parse(raw);
    res.send(todoTasks);
})

app.post("/api/todo", function(req, res) {
    console.log(req.body)

    fs.writeFile("./todo.json", JSON.stringify(req.body), function(err) {
        if (err) {
            console.error(err)
            res.status(500).send("Internal Server Error")
        } else {
            console.log("Data saved")
            res.status(200).send("Data saved successfully")
        }
    })
})

app.get("/api/users", function(req, res) {
    let raw = fs.readFileSync("./credentials.json")
    res.send(JSON.parse(raw))
})

app.post("/api/users", async function(req, res) {
    const userCopy = req.body

    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword)

    userCopy.password = hashedPassword

    const raw = fs.readFileSync("./credentials.json")
    const credentials = JSON.parse(raw)
    
    credentials.push(userCopy)

    fs.writeFile("./credentials.json", JSON.stringify(credentials), function(err) {
        if (err) {
            console.error(err)
            res.status(500).send("Internal server error")
        } else {
            console.log("User added")
            res.status(200).send("User addeds")
        }
    })
})