const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())

const PORT = 8080

app.listen(PORT, () => console.log("Server started on port", PORT));

app.use(express.static("build"))

app.get("/api/todo", (req, res) => {
    let raw = fs.readFileSync('./todo.json');
    let todoTasks = JSON.parse(raw);
    res.send(todoTasks);
})


app.post("/api/todo", function(req, res) {
    const rawData = req.body;
    console.log(rawData)

fs.writeFile('./todo.json', JSON.stringify(rawData), function (err) {
        if (err) {
            console.error(err)
            res.status(500).send("Internal Server Error")
        } else {
            console.log("Data saved")
            res.status(200).send("Data saved successfully")
        }
    })
})