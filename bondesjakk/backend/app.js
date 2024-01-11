const { Server } = require("socket.io");

const server = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
});

server.on("connection", (client) => {
    console.log("user connected")

    client.on("join room", (room) => {
        console.log(room)
        if (server.sockets.adapter.rooms.get(room) === undefined || server.sockets.adapter.rooms.get(room).size >= 2) return
        client.join(room)
        client.emit("join lobby")
        console.log(server.sockets.adapter.rooms.get(room).size)
    })

    client.on("create room", (room) => {
        console.log(room)
        if (server.sockets.adapter.rooms.get(room) !== undefined) return
        client.join(room)
        client.emit("join lobby")
        console.log("create room: " + room)
    })

    client.on("joined room", () => {
        server.to(Array.from(client.rooms)[1]).emit("get names")
    })

    client.on("send names", (name) => {
        server.to(Array.from(client.rooms)[1]).emit("names recieved", name)
    })

    client.on("disconnect", () => {
        server.to(Array.from(client.rooms)[1]).emit("get names")
        console.log("user disconnected")
    })
});

server.listen(8080)