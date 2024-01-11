import React, { useState, useEffect, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { socket } from "./App";
import { NameContext } from "./App"

function FrontPage() {
  const navigate = useNavigate()
  const [isConnected, setIsConnected] = useState(socket.connected);
  const {username, setUsername} = useContext(NameContext);

  useEffect(() => {

    function OnConnect() {
      console.log("connected")
      setIsConnected(true)
    }
    
    function OnDisconnect() {
      console.log("disconnected")
      setIsConnected(false);
    }

    socket.on("connect", OnConnect);
    socket.on("disconnect", OnDisconnect);
    socket.on("join lobby", () => navigate("/lobby"))

    return () => {
      socket.off("connect", OnConnect);
      socket.off("disconnect", OnDisconnect);
      socket.off("join lobby", () => navigate("/lobby"))
    };
  }, []);

  function JoinRoom() {
    socket.emit("join room", "test")
  }

  function CreateRoom() {
    socket.emit("create room", "test")
  }

  return (
    <div className="App">
      <p>State: {"" + isConnected}</p>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="border border-slate-700" />
      <button onClick={() => JoinRoom()} className="w-64 h-24 bg-slate-300 border border-neutral-800" />
      <button onClick={() => CreateRoom()} className="w-64 h-24 bg-slate-300 border border-neutral-800" />
    </div>
  );
}

export default FrontPage