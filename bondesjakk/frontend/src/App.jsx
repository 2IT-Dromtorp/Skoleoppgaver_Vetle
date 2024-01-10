import React, { useState, useEffect } from "react";
import {io} from "socket.io-client"

export default function App() {
  const [socketId, setSocketId] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onId(id) {
      setSocketId(id)
      console.log(id)
    }

    function onConnect() {
      console.log("connected")
      setIsConnected(true);
    }
    
    function onDisconnect() {
      console.log("disconnected")
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("id", (id) => onId(id))


    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("id", onId)
    };
  }, []);

  function HandleClick() {
    socket.emit("join room", "test")
  }

  return (
    <div className="App">
      <p>State: {"" + isConnected}</p>
      <button onClick={() => HandleClick()} className="w-64 h-24 bg-slate-300" />
    </div>
  );
}

const URL = "http://localhost:8080";

export const socket = io(URL);