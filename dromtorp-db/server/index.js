const express = require("express");
const app = express();
app.use(express.static("./dist"));
app.use(express.json());

const { MongoClient, ObjectId } = require("mongodb");
const path = require("node:path");
const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");
const { sha512 } = require("./cryptography.js");

const PORT = process.env.PORT || 8080;

async function getCollection(collection) {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db("dromtorp");
    return db.collection(collection);
}

function verifyToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });
    try {
        const decoded = jwt.verify(token, "bbop");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    (async () => {
        const users = await getCollection("users");
        const allUsers = await users.find({}).toArray();
        if (allUsers.length > 0) return;
        const salt = crypto.randomBytes(20).toString("hex");
        await users.insertOne({
            loginName: process.env.ADMIN_USERNAME,
            password: sha512(process.env.ADMIN_PASSWORD + salt),
            salt: salt,
            roles: ["admin"],
            requirePasswordChange: true,
        });
    })();

    app.get("/api/health", (req, res) => {
        res.status(200).send("Server running as expected");
    });

    app.post("/api/login", async (req, res) => {
        try {
            const collection = await getCollection("users");

            const { username, password } = req.body;

            const user = await collection.findOne({ loginName: username });
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "Could not find a user" });
            }

            const passwordMatch =
                sha512(password + user.salt) == user.password ? true : false;
            if (!passwordMatch) {
                return res.status(401).json({ message: "Wrong password" });
            }

            const token = jwt.sign({ userId: user._id }, "bbop", {
                expiresIn: "2d",
            });

            res.status(200).json({
                message: "Authentication successful",
                jwt: token,
            });
        } catch (err) {
            res.status(500).json({ message: `Login failed: ${err}` });
        }
    });

    app.post("/api/addStudent", verifyToken, async (req, res) => {
        try {
            const collection = await getCollection("elever");
            await collection.insertOne(req.body);
            res.status(200).json({ message: "Student added" });
        } catch (err) {
            res.status(400).json({ message: `Failed to add student: ${err}` });
        }
    });

    app.post("/api/addUser", verifyToken, async (req, res) => {
        try {
            const collection = await getCollection("users");
            const salt = crypto.randomBytes(20).toString("hex");
            await collection.insertOne({
                ...req.body,
                password: sha512("Skole123" + salt),
                salt: salt,
            });
            res.status(200).json({ message: "User added" });
        } catch (err) {
            res.status(500).json({ message: `Failed to add user: ${err}` });
        }
    });

    app.post("/api/addEquipment", verifyToken, async (req, res) => {
        try {
            const collection = await getCollection("utstyr");
            await collection.insertOne({
                name: req.body.name,
                available: true,
                borrowRequesters: [],
            });
            res.status(200).json({ message: "Equipment added" });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: `Failed to add equipment: ${err}`,
            });
        }
    });

    app.get("/api/getAllEquipment", verifyToken, async (req, res) => {
        try {
            const collection = await getCollection("utstyr");
            const students = await getCollection("elever");

            const allEquipment = await collection.find({}).toArray();

            for (let i = 0; i < allEquipment.length; i++) {
                if (!allEquipment[i].borrower) continue;
                allEquipment[i].borrower = await students.findOne({
                    _id: allEquipment[i].borrower.oid,
                });
            }

            res.status(200).json(allEquipment);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: `Failed to get equipment: ${err}`,
            });
        }
    });

    app.put("/api/borrowRequest", verifyToken, async (req, res) => {
        try {
            const borrowRequests = await getCollection("requests");
            const equipment = await getCollection("utstyr");
            const users = await getCollection("users");
            const students = await getCollection("elever");

            const username = await users.findOne(
                {
                    _id: new ObjectId(req.userId),
                },
                { projection: { loginName: 1, _id: 0 } }
            );

            const student = await students.findOne(
                { username: username.loginName },
                { projection: { _id: 1 } }
            );

            const request = {
                date: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
                student: {
                    $ref: "elever",
                    $id: student._id,
                    $db: "dromtorp",
                },
                equipment: {
                    $ref: "utstyr",
                    $id: new ObjectId(req.body.equipment),
                    $db: "dromtorp",
                },
            };

            await borrowRequests.insertOne(request);

            await equipment.updateOne(
                { _id: new ObjectId(req.body.equipment) },
                { $push: { borrowRequesters: req.userId } }
            );

            res.status(200).json({
                message: "Succesfully added a borrow request",
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: `Failed to add borrow request: ${err}`,
            });
        }
    });

    app.get("/api/whoami", verifyToken, async (req, res) => {
        try {
            const users = await getCollection("users");

            const user = await users.findOne(
                { _id: new ObjectId(req.userId) },
                { projection: { password: 0, salt: 0 } }
            );

            if (user == null) {
                return res
                    .status(401)
                    .json({ message: "Could not authenticate user" });
            }

            return res.status(200).json(user);
        } catch (err) {
            return res
                .status(500)
                .json({ message: `An error occured: ${err}` });
        }
    });

    app.get("/api/student-data", verifyToken, async (req, res) => {
        try {
            const users = await getCollection("users");
            const students = await getCollection("elever");

            const username = await users.findOne(
                {
                    _id: new ObjectId(req.userId),
                },
                { projection: { loginName: 1, _id: 0 } }
            );

            if (username == null)
                return res.status(401).json({ message: "Could not find user" });
            const student = await students.findOne(
                { username: username.loginName },
                { projection: { _id: 0 } }
            );

            if (student == null)
                return res
                    .status(400)
                    .json({ message: "Could not find student information" });

            return res.status(200).json(student);
        } catch (err) {
            return res
                .status(500)
                .json({ message: `An error occured: ${err}` });
        }
    });

    app.get("/api/requested-equipment", verifyToken, async (req, res) => {
        try {
            const requests = await getCollection("requests");
            const students = await getCollection("elever");
            const equipment = await getCollection("utstyr");

            const allRequests = await requests.find({}).toArray();
            for (let i = 0; i < allRequests.length; i++) {
                allRequests[i].student = await students.findOne({
                    _id: allRequests[i].student.oid,
                });
                allRequests[i].equipment = await equipment.findOne({
                    _id: allRequests[i].equipment.oid,
                });
            }

            return res.status(200).json(allRequests);
        } catch (err) {
            return res
                .status(500)
                .json({ message: `An error occured: ${err}` });
        }
    });

    app.post("/api/answer-request", verifyToken, async (req, res) => {
        try {
            const requests = await getCollection("requests");
            const equipmentCol = await getCollection("utstyr");

            const request = await requests.findOne({
                _id: new ObjectId(req.body.id),
            });

            await equipmentCol.updateOne(
                { _id: request.equipment.oid },
                { $set: { borrowRequesters: [] } }
            );

            if (req.body.result) {
                await equipmentCol.updateOne(
                    {
                        _id: request.equipment.oid,
                    },
                    {
                        $set: {
                            available: false,
                            borrower: {
                                $ref: "elever",
                                $id: new ObjectId(request.student.oid),
                                $db: "dromtorp",
                            },
                        },
                    }
                );
                await requests.deleteMany({ equipment: request.equipment });
                return res
                    .status(200)
                    .json({ message: "Succesfully approved request" });
            }
            await requests.deleteOne({ _id: new ObjectId(req.body.id) });

            return res
                .status(200)
                .json({ message: "Succesfully denied request" });
        } catch (err) {
            return res
                .status(500)
                .json({ message: `An error occured: ${err}` });
        }
    });

    app.post("/api/return-equipment", verifyToken, async (req, res) => {
        try {
            const equipment = await getCollection("utstyr");

            await equipment.updateOne(
                { _id: new ObjectId(req.body.id) },
                { $set: { available: true }, $unset: { borrower: "" } }
            );

            return res
                .status(200)
                .json({ message: "Succesfully returned equipment" });
        } catch (err) {
            return res
                .status(500)
                .json({ message: `An error occured: ${err}` });
        }
    });

    app.post("/api/change-password", verifyToken, async (req, res) => {
        if (req.body.oldPassword == req.body.newPassword)
            return res
                .status(400)
                .json({ message: "Passwords cannot be the same" });
        const users = await getCollection("users");

        const salt = crypto.randomBytes(20).toString("hex");

        const user = await users.findOne(
            { _id: new ObjectId(req.userId) },
            { projection: { password: 1, salt: 1 } }
        );

        if (user.password != sha512(req.body.oldPassword + user.salt))
            return res
                .status(401)
                .json({ message: "Old password is incorrect" });

        await users.updateOne(
            { _id: new ObjectId(req.userId) },
            {
                $set: {
                    requirePasswordChange: false,
                    password: sha512(req.body.newPassword + salt),
                    salt: salt,
                },
            }
        );
        res.status(200).json({ message: "Succesfully changed password" });
    });

    app.get("/*", (req, res) => {
        res.status(200).sendFile(path.resolve("./dist/index.html"));
    });
});
