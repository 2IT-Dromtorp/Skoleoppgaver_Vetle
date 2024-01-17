import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { socket } from "./App";

function Layout() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket.connected) {
            navigate("/")
        }
    }, [])

    return(
        <Outlet />
    )
}

export default Layout;