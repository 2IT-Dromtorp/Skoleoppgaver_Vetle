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
})