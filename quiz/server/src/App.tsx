import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Host from "./pages/Host";
import Answer from "./pages/Answer";
import Create from "./pages/Create";

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="host" element={<Host />} />
                    <Route path="answer/:name" element={<Answer />} />
                    <Route path="create" element={<Create />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

export const socket = io();
