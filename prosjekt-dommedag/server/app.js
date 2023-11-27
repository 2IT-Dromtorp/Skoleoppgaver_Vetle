const express = require("express")
const bcrypt = require("bcrypt")
const mysql = require("mysql2")
const path = require("path")
const app = express()

app.use(express.json())

const dbConnection = mysql.createConnection({
    user: "root",
    password: "123qweasdzxc",
    port: 3306,
    database: "dommedag_db",
});

const PORT = 8080 

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
    
    app.use(express.static("dist"))

    app.get("/api/courses", (req, res) => {
        dbConnection.connect((err) => {
            if (err) return
            dbConnection.query("SELECT * FROM courses", (err, result) => {
                if (err) return
                res.status(200).json(result)
            })
        })
    })

    app.post("/api/register", async (req, res) => {
        const userCopy = req.body
    
        userCopy.password = await bcrypt.hash(req.body.password, 10)

        console.log(userCopy)

        dbConnection.connect((err) => {
            if (err) {console.error(err);res.status(500).json(err)}
            dbConnection.query("INSERT INTO users (name, mail, password) VALUES (?, ?, ?)", [userCopy.name, userCopy.mail, userCopy.password],(err, result) => {
                if (err) {console.error(err);res.status(409).json(err)}
                console.log("User added", userCopy)
                res.status(200).json(result)
            })
        })
    })
    
    app.post("/api/login", (req, res) => {
        dbConnection.connect((err) => {
            if (err) {console.error(err);res.status(500).json(err)}
            dbConnection.query("SELECT * FROM users WHERE mail = ?", [req.body.mail],(err, sql) => {
                if (err) {console.error(err);res.status(400).json(err)}
                console.log(sql)
                bcrypt.compare(req.body.password, sql[0].password, (err, result) => {
                    if (result){
                        res.status(200).json({"result": result, "message": "Login successful", "name": sql[0].name})
                    } else if (!result) {
                        res.status(403).json({"result": result, "message": "Wrong password or username"})
                    }
                })
            })
        })
    })
})