const express = require("express")
const bcrypt = require("bcrypt")
const mysql = require("mysql2")
const path = require("path")
const crypto = require("crypto")

const app = express()

app.use(express.json())

const dbConnection = mysql.createConnection({
    user: "root",
    password: "123",
    port: 3306,
    database: "dommedag_db",
});

function Encrypt(plainText) {
    return crypto.createHmac("sha256", plainText).update("").digest("hex")
}

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
            dbConnection.query("SELECT * FROM users WHERE mail = ?", [req.body.mail], (err, sql) => {
                if (err || sql[0] === undefined) {console.error(err);res.status(400).json(err);return}
                bcrypt.compare(req.body.password, sql[0].password, (err, result) => {
                    if (err) {console.log(err);res.status(500).json(err)}
                    if (result){
                        const token = Encrypt(sql[0].mail)
                        res.cookie("token", token);
                        dbConnection.query("UPDATE users SET token = ? WHERE mail = ?", [token, sql[0].mail], (err) => {
                            if (err) {console.log(err);res.status(500).json(err)}
                            res.status(200).json({"message": "Login successful"})
                        })
                    } else if (!result) {
                        res.status(401).json({"message": "Wrong password or username"})
                    }
                })
            })
        })
    })

    app.get("/api/token", (req, res) => {
        if (req.headers.cookie === undefined){res.status(200).json(false);return}

        const cookieValue = req.headers.cookie.split("=")[1]
        dbConnection.connect((err) => {
            if (err) {console.log(err);res.status(500).json(err)}
            dbConnection.query("SELECT token FROM users WHERE token = ?", [cookieValue], (err, sql) => {
                if (err || sql[0] === undefined) {console.log(err);res.status(418).json(err);return}
                res.status(200).json(true)
            })
        })
    })

    app.get("/api/join", (req, res) => {
        if (req.headers.cookie === undefined){res.status(200).json(false);return}

        const cookieValue = req.headers.cookie.split("=")[1]
        dbConnection.connect((err) => {
            if (err) {console.log(err);res.status(500).json(err)}
            dbConnection.query("SELECT token, mail FROM users WHERE token = ?", [cookieValue], (err, userSql) => {
                if (err || userSql[0].token === undefined) {console.log(err);res.status(418).json(err);return}
                dbConnection.query("SELECT joined, name FROM courses WHERE ('name' = ?)", [req.query.course], (err, courseSql) => {
                    if (err) {console.log(err);res.status(418).json(err);return}
                    const joined = JSON.parse(sql[0].joined)
                    console.log(joined)
                    joined.push(userSql[0].mail)
                    dbConnection.query("UPDATE courses SET joined = ? WHERE (name = ?)", [joined, courseSql[0].name], (err, sql) => {
                        if (err) {console.log(err);res.status(500).json(err)}
                        res.status(200).json(sql)
                    })
                })
            })
        })
    })

    app.get("/api/user", (req, res) => {
        if (req.headers.cookie === undefined){res.status(200).json(false);return}

        const cookieValue = req.headers.cookie.split("=")[1]
        dbConnection.connect((err) => {
            if (err) {console.log(err);res.status(500).json(err)}
            dbConnection.query("SELECT name, mail FROM users WHERE token = ?", [cookieValue], (err, userSql) => {
                if (err || userSql[0].token === undefined) {console.log(err);res.status(418).json(err);return}
                res.status(200).json(userSql[0])
            })
        })
    })
})