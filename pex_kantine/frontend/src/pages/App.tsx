import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../assets/Layout";
import Home from "./Home";
import AdminLogin from "./AdminLogin";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="admin-login" element={<AdminLogin />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
