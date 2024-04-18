import { Navigate, Outlet } from "react-router-dom";

function ProtectedPath(): JSX.Element {
    const authenticated: boolean = Boolean(localStorage.getItem("jwt"));
    return <>{authenticated ? <Outlet /> : <Navigate to={"/login"} />}</>;
}

export default ProtectedPath;
