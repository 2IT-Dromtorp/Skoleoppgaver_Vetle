import { useContext, useEffect, useState } from "react";
import {io} from "socket.io-client"
import { useNavigate } from "react-router-dom";
import { socket } from "./App";
import { NameContext } from "./App";

function Lobby() {
    const navigate = useNavigate();
    const {username} = useContext(NameContext)
    const [names, setNames] = useState([])

    useEffect(() => {    

        socket.emit("joined room")

        function OnGotNames(name) {
            setNames(prevNames => [...prevNames, name])
            console.log(name)
        }
        function OnGetNames() {
            setNames([])
            socket.emit("send names", username)
        }
        function OnUserLeft() {
            socket.emit("joined room", username)
        }

        socket.on("names recieved", (name) => OnGotNames(name))
        socket.on("user left", OnUserLeft)
        socket.on("get names", OnGetNames)
        socket.on("send to game", () => navigate("/game"))

        return () => {
            socket.off("names recieved", (name) => OnGotNames(name))
            socket.off("user left", OnUserLeft)
            socket.off("get names", OnGetNames)
            socket.off("send to game", () => navigate("/game"))
        };
    }, []);

    function SendToGame(){
        socket.emit("send to game")
    }

    return (
        <>
            <p>Lobby</p>
            {names.map((name, index) => {
                return <p key={index}>{name}</p>
            })}
            {names.length >= 2 && <button onClick={() => SendToGame()} className="bg-lime-500">Start game</button>}
        </>
    )
}

export default Lobby