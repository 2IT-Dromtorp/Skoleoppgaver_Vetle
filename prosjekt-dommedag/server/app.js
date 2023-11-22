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
        {"name": "Grunnleggende datakunnskap", "date": "12.12.2023", "time": "13:00", "description": "lorem"},
        {"name": "Norsk", "date": "12.12.2023", "time": "13:00", "description": "lorem"},
        {"name": "Heimkunnskap", "date": "12.12.2023", "time": "13:00", "description": "lorem"},
        {"name": "Kroppsøving", "date": "12.12.2023", "time": "13:00", "description": "lorem"},
    ]

    app.get("/api/courses", (req, res) => {
        console.log(courses)
        res.status(200).json(courses)
    })
})