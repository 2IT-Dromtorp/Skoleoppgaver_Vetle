const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

const port = 8080

app.listen(port, () => {
    app.get("/api/get", (req, res) => {
        res.status(200).json({"message": "👌"})
    })
})