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
    
    app.get("/api/todo", (req, res) => {
        const todoTasks = JSON.parse(fs.readFileSync("./todo.json"));
        
        res.send(todoTasks[req.query.id].tasks);
    })

    app.get("/api/todo/name", (req, res) => {
        const todoTasks = JSON.parse(fs.readFileSync("./todo.json"));

        res.status(200).json({"name": todoTasks[req.query.id].name, "id": req.query.id})
    })
    
    app.post("/api/todo", (req, res) => {
        let file = JSON.parse(fs.readFileSync("./todo.json"));
        console.log(req.query.id)
        file[req.query.id].tasks = JSON.parse(req.body.tasks)

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
        const credentials = JSON.parse(fs.readFileSync("./credentials.json"))

        for (let i in credentials){
            if(!(userCopy.username === credentials[i].username)) continue
            res.status(403).json({"status": "User already exists"})
        }
    
        userCopy.password = await bcrypt.hash(req.body.password, 10)

        userCopy.availableLists = [];
    
        
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
        const credentials = JSON.parse(fs.readFileSync("./credentials.json"))
    
        let userIndex;

        req.body.username
        
        for (let i in credentials){
            if (credentials[i].username.toLowerCase() == req.body.username.toLowerCase()){
                userIndex = i;
            }
        }
    
        if(userIndex != undefined){
            bcrypt.compare(req.body.password, credentials[userIndex].password, (err, result) => {
                if (result){
                    res.status(200).json({"result": result, "error": "Login successful", "username": credentials[userIndex].username})
                } else if (!result) {
                    res.status(401).json({"result": result, "error": "Wrong password or username"})
                }
            })
        } else {
            res.status(400).json({"result": "Username not found", "error": "Username not found"})
        }
    })
    
    app.get("/availablelists", (req, res) => {
        const credentials = JSON.parse(fs.readFileSync("./credentials.json"))

        let userId = undefined;

        for(let i in credentials){if (credentials[i].username.toLowerCase() == req.query.user.toLowerCase()){userId = i}}

        if(userId == undefined) res.status(404).send("User not found")
        
        res.status(200).send(credentials[userId].availableLists)
    })

    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    })
})
