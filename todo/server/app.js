const express = require('express')
const fs = require('fs')

const app = express()

const PORT = 8080

app.listen(PORT, () => console.log("Server started"));

app.use(express.static("build"))

app.get("/api/todo", (req, res) => {
    let raw = fs.readFileSync('./todo.json');
    let todoTasks = JSON.parse(raw);
    res.send(todoTasks);
})


app.post("/api/todo", (req, res) => {
    console.log(req.body)
    let raw = req.body;
    let todoTasks = JSON.parse(raw);

    try { 
        fs.writeFile('./todo.json', JSON.stringify(todoTasks), (err) => {
            console.log(req.body)
        })
        console.log(req.body)
    }
    catch (error) {
        console.log("error", error)
    }
})