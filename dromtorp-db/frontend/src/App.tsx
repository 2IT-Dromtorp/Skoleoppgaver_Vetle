import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AddStudent from "./pages/AddStudent";
import AddEquipment from "./pages/AddEquipment";
import Equipment from "./pages/Equipment";
import Profile from "./pages/Profile";
import ProtectedPath from "./pages/ProtectedPath";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Requests from "./pages/Requests";
import axios from "axios";
import ChangePassword from "./pages/ChangePassword";
import AddUser from "./pages/AddUser";

export const queryClient = new QueryClient();

function App() {
    axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("jwt");

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools client={queryClient} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="login" element={<Login />} />
                        <Route element={<ProtectedPath />}>
                            <Route path="profile" element={<Profile />} />
                            <Route
                                path="change-password"
                                element={<ChangePassword />}
                            />
                            <Route path="addStudent" element={<AddStudent />} />
                            <Route
                                path="addEquipment"
                                element={<AddEquipment />}
                            />
                            <Route path="add-user" element={<AddUser />} />
                            <Route path="equipment" element={<Equipment />} />
                            <Route path="requests" element={<Requests />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
