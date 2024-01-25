const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

const port = 8080

app.listen(port, () => {
    app.get("/api/get", (req, res) => {
        res.status(200).json({"message": "👌"})
    })
})