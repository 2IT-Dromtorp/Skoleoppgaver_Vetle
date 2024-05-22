const express = require("express");

const app = express();
const port = 8080;

const mongoUrl = process.env.MONGO_URL;
const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!mongoUrl || !adminUsername || !adminPassword) {
    console.error("Missing environment variables! Please provide MONGO_URL, ADMIN_USERNAME and ADMIN_PASSWORD.");
    process.exit(1);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    app.get("/api/health", (req, res) => {
        res.send("Server is running!");
    });
});
