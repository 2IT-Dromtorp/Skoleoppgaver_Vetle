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
    let raw = req.body;
    //let todoTasks = JSON.parse(raw);
    console.log(raw)

    fs.writeFile('./todo.json', '[{"name":"Oppgave1","description":"Første oppgave","isCompleted":false,"id":1}]', function (err) {
        if (err) throw err
        console.log("saved")
    })
})