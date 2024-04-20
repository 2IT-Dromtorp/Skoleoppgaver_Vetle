import { AuthenticateUser } from "@/hooks/UseApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function ProtectedPath(): JSX.Element {
    const { isPending, error, data } = useQuery({
        queryKey: ["user"],
        queryFn: AuthenticateUser,
    });

    return (
        <div className="flex justify-center items-center">
            {isPending ? (
                <ClipLoader />
            ) : error || !data ? (
                <Navigate to={"/login"} />
            ) : (
                <Outlet />
            )}
        </div>
    );
}

export default ProtectedPath;
