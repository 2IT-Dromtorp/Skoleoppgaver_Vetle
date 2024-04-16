import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AddStudent from "./pages/AddStudent";
import AddEquipment from "./pages/AddEquipment";
import Equipment from "./pages/Equipment";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="addStudent" element={<AddStudent />} />
                    <Route path="addEquipment" element={<AddEquipment />} />
                    <Route path="equipment" element={<Equipment />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
