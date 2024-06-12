import { Outlet } from "react-router-dom";
import NavElement from "./components/NavElement";

function Layout(): JSX.Element {
    return (
        <div className="min-h-screen relative bg-background">
            <nav className="flex flex-row justify-evenly mb-4 bg-background border shadow-lg">
                <NavElement route="/">Hjem</NavElement>
                <NavElement route="/sports">Sporter</NavElement>
                <NavElement route="/tournaments">Turneringer</NavElement>
                <NavElement route="/login">Admin visning</NavElement>
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;
