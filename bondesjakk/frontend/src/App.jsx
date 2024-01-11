import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import {io} from "socket.io-client"
import Layout from "./Layout";
import FrontPage from "./FrontPage";
import Lobby from "./Lobby";
import Game from "./Game";

export const NameContext = createContext("")

function App() {
  const [username, setUsername] = useState("");

  return (
    <BrowserRouter>
      <NameContext.Provider value={{username, setUsername}}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<FrontPage />} />
            <Route path="lobby" element={<Lobby />} />
            <Route path="game" element={<Game />} />
          </Route>
        </Routes>
      </NameContext.Provider>
    </BrowserRouter>
  )
}

export default App

const URL = "http://localhost:8080";
export const socket = io(URL);