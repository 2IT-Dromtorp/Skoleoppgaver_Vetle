import { AuthenticateUser } from "@/hooks/UseApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function ProtectedPath(): JSX.Element {
    const { isPending, data } = useQuery({
        queryKey: ["user"],
        queryFn: AuthenticateUser,
        retry: 2,
    });

    return (
        <div className="flex justify-center items-center">
            {isPending ? (
                <ClipLoader />
            ) : !data ? (
                <Navigate to={"/login"} />
            ) : (
                <Outlet />
            )}
        </div>
    );
}

export default ProtectedPath;
