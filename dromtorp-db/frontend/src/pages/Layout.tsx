import { queryClient } from "@/App";
import { User } from "@/assets/Types";
import { Button } from "@/components/ui/Button";
import { Toaster } from "@/components/ui/Sonner";
import { checkRoles } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
function Layout(): JSX.Element {
    const { data: user } = useQuery<User>({
        queryKey: ["user"],
    });

    const navigate = useNavigate();
    const location = useLocation().pathname;

    function logOut() {
        localStorage.removeItem("jwt");
        queryClient.clear();
        navigate("/login");
    }

    useEffect(() => {
        user?.requirePasswordChange &&
            location != "/change-password" &&
            navigate("/change-password");
    });

    return (
        <>
            <div className="bg-background text-foreground relative min-h-screen">
                <>
                    <nav className="flex w-full justify-evenly py-3">
                        <Link to={"/"}>
                            <Button>Home</Button>
                        </Link>
                        {!user && (
                            <Link to={"/login"}>
                                <Button>Log in</Button>
                            </Link>
                        )}
                        {user && (
                            <Link to={"/equipment"}>
                                <Button>Equipment</Button>
                            </Link>
                        )}
                        {user && checkRoles(["admin"], user?.roles || []) && (
                            <Link to={"/add-user"}>
                                <Button>Add user</Button>
                            </Link>
                        )}

                        {checkRoles(
                            ["admin", "teacher"],
                            user?.roles || []
                        ) && (
                            <>
                                <Link to={"/addStudent"}>
                                    <Button>Add student</Button>
                                </Link>
                                <Link to={"/addEquipment"}>
                                    <Button>Add equipment</Button>
                                </Link>
                                <Link to={"/requests"}>
                                    <Button>Requests</Button>
                                </Link>
                            </>
                        )}

                        {checkRoles(["student"], user?.roles || []) && (
                            <Link to={"/profile"}>
                                <Button>Profile</Button>
                            </Link>
                        )}

                        {user && (
                            <Button
                                onClick={() => logOut()}
                                variant={"outline"}
                                size={"icon"}
                            >
                                <LogOut />
                            </Button>
                        )}
                    </nav>
                    <div>
                        <Outlet />
                    </div>
                </>
            </div>
            <Toaster />
        </>
    );
}

export default Layout;
