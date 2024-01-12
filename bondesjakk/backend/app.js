const { Server } = require("socket.io");

const server = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
});

server.on("connection", (client) => {
    console.log("user connected")

    client.on("join room", (room) => {
        if (server.sockets.adapter.rooms.get(room) === undefined || server.sockets.adapter.rooms.get(room).size >= 2) return
        client.join(room)
        console.log("client joined room: " + room)
        client.emit("join lobby")
    })

    client.on("create room", (room) => {
        if (server.sockets.adapter.rooms.get(room) !== undefined) return
        client.join(room)
        console.log("create room: " + room)
        client.emit("join lobby")
    })

    client.on("joined room", () => {
        server.to(Array.from(client.rooms)[1]).emit("get names")
    })

    client.on("send names", (name) => {
        server.to(Array.from(client.rooms)[1]).emit("names recieved", name)
    })
    
    client.on("send to game", () => {
        console.log("game started")
        server.to(Array.from(client.rooms)[1]).emit("send to game")
    })

    client.on("disconnecting", () => {
        client.to(Array.from(client.rooms)[1]).emit("user left")
    })

    client.on("disconnect", () => {
        console.log("user disconnected")
    })
});

server.listen(8080)