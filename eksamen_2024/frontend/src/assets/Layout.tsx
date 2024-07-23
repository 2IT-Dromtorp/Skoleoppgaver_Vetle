import { Link, Outlet } from "react-router-dom";
import NavElement from "./components/NavElement";
import { useEffect, useState } from "react";
import axios from "axios";
import { LogIn, LogOut } from "lucide-react";

function Layout(): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const authRes = await axios.get("/api/check-auth", {
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setIsLoggedIn(true);
                if (authRes.data.isAdmin) setIsAdmin(true);
            } catch (err) {
                setIsLoggedIn(false);
            }
        })();
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div className="min-h-screen relative bg-background text-text">
            <nav className="flex flex-row justify-evenly mb-8 bg-background brightness-125 shadow-lg">
                <NavElement route="/">Hjem</NavElement>
                <NavElement route="/sports">Sporter</NavElement>
                <NavElement route="/tournaments">Turneringer</NavElement>
                {isAdmin && <NavElement route="/answer-requests">Svar på forespørsler</NavElement>}
                {isLoggedIn ? (
                    <>
                        <NavElement route="/profile">Profil</NavElement>
                        <button
                            onClick={() => handleLogout()}
                            className="py-4 px-6 text-lg font-semibold rounded-lg duration-200 m-2 bg-primary hover:brightness-[.85]"
                        >
                            <LogOut />
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        <button className="py-4 px-6 text-lg font-semibold rounded-lg duration-200 m-2 bg-primary hover:brightness-[.85]">
                            <LogIn />
                        </button>
                    </Link>
                )}
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;
