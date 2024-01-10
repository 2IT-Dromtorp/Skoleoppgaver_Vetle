const { Server } = require("socket.io");

const server = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
});

server.on("connection", (client) => {
    console.log("user connected")
    client.emit("id", client.id)

    client.on("join room", (room) => {
        console.log(room)
        if (server.sockets.adapter.rooms.get(room) === undefined || server.sockets.adapter.rooms.get(room).size >= 2) return
        client.join(room)
    })

    client.on("disconnect", () => {
        console.log("user disconnected")
    })
});

server.listen(8080)