import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./assets/Layout";
import Home from "./pages/Home";
import Tournaments from "./pages/Tournaments";
import Sports from "./pages/Sports";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="sports" element={<Sports />} />
                    <Route path="tournaments" element={<Tournaments />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
