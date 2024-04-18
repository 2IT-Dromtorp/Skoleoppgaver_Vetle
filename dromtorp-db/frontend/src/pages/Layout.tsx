import { Button } from "@/components/ui/Button";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

function Layout(): JSX.Element {
    axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("jwt");

    return (
        <div className="bg-background relative min-h-screen">
            <nav className="flex w-full justify-evenly bg-foreground py-3">
                <Link to={"/"}>
                    <Button>Home</Button>
                </Link>
                <Link to={"/login"}>
                    <Button>Log in</Button>
                </Link>
                <Link to={"/equipment"}>
                    <Button>Equipment</Button>
                </Link>
                <Link to={"/addStudent"}>
                    <Button>Add student</Button>
                </Link>
                <Link to={"/addEquipment"}>
                    <Button>Add equipment</Button>
                </Link>
                <Link to={"/profile"}>
                    <Button>Profile</Button>
                </Link>
            </nav>
            <div>
                <Outlet />
            </div>
            <footer className="absolute bottom-0 w-full justify-evenly bg-foreground py-3">
                <p>Fin footer</p>
            </footer>
        </div>
    );
}

export default Layout;
