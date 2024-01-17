const { Server } = require("socket.io");

const server = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
});

server.on("connection", (client) => {
    client.on("join room", (room) => {
        if (server.sockets.adapter.rooms.get(room) === undefined || server.sockets.adapter.rooms.get(room).size >= 2) return
        client.rooms.forEach((room) => console.log(room))
        client.join(room)
        client.emit("join lobby")
    })
    
    client.on("create room", (room) => {
        if (server.sockets.adapter.rooms.get(room) !== undefined) return
        client.rooms.forEach((room) => console.log(room))
        client.join(room)
        client.emit("join lobby")
    })

    client.on("joined room", () => {
        server.to(Array.from(client.rooms)[1]).emit("get names")
    })

    client.on("send names", (name) => {
        server.to(Array.from(client.rooms)[1]).emit("names recieved", name)
    })
    
    client.on("send to game", () => {
        server.to(Array.from(client.rooms)[1]).emit("send to game")
    })

    client.on("get roles", () => {
        try {
            if (Math.round(Math.random())) {
                console.log("true")
                client.to(Array.from(server.sockets.adapter.rooms.get(Array.from(client.rooms)[1]))[0]).emit("role", true)
                client.to(Array.from(server.sockets.adapter.rooms.get(Array.from(client.rooms)[1]))[1]).emit("role", false)
            } else {
                console.log("false")
                client.to(Array.from(server.sockets.adapter.rooms.get(Array.from(client.rooms)[1]))[0]).emit("role", false)
                client.to(Array.from(server.sockets.adapter.rooms.get(Array.from(client.rooms)[1]))[1]).emit("role", true)
            }
        }
        catch(err) {
        }
    })
    
    client.on("made move", (boxValue) => {
        server.to(Array.from(client.rooms)[1]).emit("made move", boxValue)
    })

    client.on("disconnecting", () => {
        client.to(Array.from(client.rooms)[1]).emit("user left")
    })
});

server.listen(8080)