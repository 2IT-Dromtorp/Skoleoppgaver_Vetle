const express = require("express")
const fs = require("fs")
const bcrypt = require("bcrypt")
const path = require("path")
const app = express()

app.use(express.json())

const PORT = 8080 

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
    
    app.use(express.static("dist"))

    const courses = [
        {"name": "Grunnleggende datakunnskap", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": false},
        {"name": "Norsk", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": true},
        {"name": "Heimkunnskap", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": false},
        {"name": "Kroppsøving", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": false},
        {"name": "Heimkunnskap", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": false},
        {"name": "Kroppsøving", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": false},
        {"name": "Heimkunnskap", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": false},
        {"name": "Kroppsøving", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": false},
        {"name": "Heimkunnskap", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": false},
        {"name": "Kroppsøving", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": false},
        {"name": "Heimkunnskap", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": false},
        {"name": "Kroppsøving", "date": "12.12.2023", "time": "13:00", "description": "lorem", "joined": false},
    ]

    app.get("/api/courses", (req, res) => {
        console.log(courses)
        res.status(200).json(courses)
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
})