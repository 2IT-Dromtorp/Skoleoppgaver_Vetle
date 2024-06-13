import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected(): JSX.Element {
    const [hasAccess, setHasAccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/api/check-auth", {
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                if (res.data) {
                    setHasAccess(true);
                    setIsLoading(false);
                }
            } catch (err) {
                setHasAccess(false);
                setIsLoading(false);
            }
        })();
    }, []);
    return <>{isLoading ? <p>Sjekker autoritet</p> : !hasAccess ? <Navigate to="/login" /> : <Outlet />}</>;
}

export default Protected;
