import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import {io} from "socket.io-client"
import Layout from "./Layout";
import FrontPage from "./FrontPage";
import Lobby from "./Lobby";
import Game from "./Game";
import Winner from "./Winner";

export const NameContext = createContext("")
export const StartingContext = createContext("")

function App() {
  const [username, setUsername] = useState("");
  const [myTurn, setMyTurn] = useState(true)

  return (
    <BrowserRouter>
      <NameContext.Provider value={{username, setUsername}}>
        <StartingContext.Provider value={{myTurn, setMyTurn}}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<FrontPage />} />
              <Route path="lobby" element={<Lobby />} />
              <Route path="game" element={<Game />} />
              <Route path="winner/:result" element={<Winner />} />
            </Route>
          </Routes>
        </StartingContext.Provider>
      </NameContext.Provider>
    </BrowserRouter>
  )
}

export default App

const URL = "http://localhost:8080";
export const socket = io(URL);