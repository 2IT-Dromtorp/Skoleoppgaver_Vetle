import axios from "axios";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout(): JSX.Element {
    const navigate = useNavigate();

    axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwt");

    useEffect(() => {
        if (localStorage.getItem("jwt") && location.pathname == "/login") navigate("/profile");
        if (localStorage.getItem("jwt")) return
        if (location.pathname == "/addStudent") navigate("/login");
        if (location.pathname == "/addEquipment") navigate("/login");
        if (location.pathname == "/equipment") navigate("/login");
    })

    return (
        <div className="relative min-h-screen">
            <nav className="flex w-full justify-evenly bg-slate-700 py-3">
                <Link to={"/"} className="bg-slate-400 py-4 px-10 rounded-sm">Home</Link>
                <Link to={"/login"} className="bg-slate-400 py-4 px-10 rounded-sm">Log in</Link>
                <Link to={"/equipment"} className="bg-slate-400 py-4 px-10 rounded-sm">Equipment</Link>
                <Link to={"/addStudent"} className="bg-slate-400 py-4 px-10 rounded-sm">Add student</Link>
                <Link to={"/addEquipment"} className="bg-slate-400 py-4 px-10 rounded-sm">Add equipment</Link>
            </nav>
            <div>
                <Outlet />
            </div>
            <footer className="absolute bottom-0 w-full justify-evenly bg-slate-700 py-3">
                <p>Fin footer</p>
            </footer>
        </div>
    );
}

export default Layout;
