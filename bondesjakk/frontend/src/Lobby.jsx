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

        socket.emit("joined room", username)

        function OnGotNames(name) {
            setNames(prevNames => [...prevNames, name])
            console.log(name)
        }
        function OnGetNames() {
            setNames([])
            socket.emit("send names", username)
        }

        socket.on("names recieved", (name) => OnGotNames(name))
        socket.on("get names", OnGetNames)

        return () => {
            socket.off("names recieved", (name) => OnGotNames(name))
            socket.off("get names", OnGetNames)
        };
    }, []);

    return (
        <>
            <p>Lobby</p>
            {names.map((name, index) => {
                return <p key={index}>{name}</p>
            })}
            {names.length >= 2 && <button className="bg-lime-500">Start game</button>}
        </>
    )
}

export default Lobby