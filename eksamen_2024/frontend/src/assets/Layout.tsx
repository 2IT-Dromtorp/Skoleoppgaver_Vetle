import { Outlet } from "react-router-dom";
import NavElement from "./components/NavElement";
import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";

function Layout(): JSX.Element {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const authRes = await axios.get("/api/check-auth", {
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                if (authRes.data) {
                    setIsAdmin(true);
                }
            } catch (err) {
                setIsAdmin(false);
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
                <NavElement route="/admin">Admin visning</NavElement>
                {isAdmin && (
                    <>
                        <NavElement route="/answer-requests">Svar på forespørsler</NavElement>
                        <button
                            onClick={() => handleLogout()}
                            className="py-4 px-6 text-lg font-semibold rounded-lg duration-200 m-2 bg-primary hover:brightness-[.85]"
                        >
                            <LogOut />
                        </button>
                    </>
                )}
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;
