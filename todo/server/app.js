const express = require("express")
const fs = require("fs")
const bcrypt = require("bcrypt")
const path = require("path")
const app = express()

app.use(express.json())

const PORT = 8080 

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
    
    app.use(express.static("build"))

    app.get("/*", (req, res) => {
        console.log("a")
        res.sendFile(path.join(__dirname, "build", "index.html"));
    })
    
    app.get("/api/todo", (req, res) => {
        console.log(req.query.id)
        let todoTasks = JSON.parse(fs.readFileSync("./todo.json"));
        
        res.send(todoTasks[req.query.id].tasks);
    })
    
    app.post("/api/todo", (req, res) => {
        let file = JSON.parse(fs.readFileSync("./todo.json"));
        file[req.body.listToEdit].tasks = JSON.parse(req.body.tasks)

        fs.writeFile("./todo.json", JSON.stringify(file), function(err) {
            if (err) {
                console.error(err)
                res.status(500).send("Internal Server Error")
            } else {
                console.log("Data saved")
                res.status(200).send("Data saved successfully")
            }
        })
    })
    
    app.post("/register", async (req, res) => {
        const userCopy = req.body
    
        userCopy.password = await bcrypt.hash(req.body.password, 10)
    
        const raw = fs.readFileSync("./credentials.json")
        const credentials = JSON.parse(raw)
        
        credentials.push(userCopy)
        
        fs.writeFile("./credentials.json", JSON.stringify(credentials), function(err) {
            if (err) {
                console.error(err)
                res.status(500).json({"status": "Internal server error"})
            } else {
                console.log("User added")
                res.status(200).json({"status": "User added"})
            }
        })
    })
    
    app.post("/login", (req, res) => {
        const raw = fs.readFileSync("./credentials.json")
        const credentials = JSON.parse(raw)
    
        let mailIndex;
        
        for (let i in credentials){
            if (credentials[i].mail.toLowerCase() == req.body.mail){
                mailIndex = i;
            }
        }
    
        if(mailIndex != undefined){
            bcrypt.compare(req.body.password, credentials[mailIndex].password, (err, result) => {
                if (result){
                    res.status(200).json({"result": result, "error": "Login successful", "username": credentials[mailIndex].username})
                } else if (!result) {
                    res.status(401).json({"result": result, "error": "Wrong password or mail"})
                }
            })
        } else {
            res.status(400).json({"result": "Mail not found", "error": "Incorrect mail"})
        }
    })
})
