import { queryClient } from "@/App";
import { User } from "@/assets/Types";
import { Button } from "@/components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
function Layout(): JSX.Element {
    const { data: user } = useQuery<User>({
        queryKey: ["user"],
    });

    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem("jwt");
        queryClient.clear();
        navigate("/login");
    }

    return (
        <>
            <div className="bg-background text-foreground relative min-h-screen">
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
                    {user && user.roles.includes("admin") && (
                        <Link to={"/addStudent"}>
                            <Button>Add student</Button>
                        </Link>
                    )}

                    {["admin", "teacher"].some((str) =>
                        user?.roles.includes(str)
                    ) && (
                        <>
                            <Link to={"/addEquipment"}>
                                <Button>Add equipment</Button>
                            </Link>
                            <Link to={"/requests"}>
                                <Button>Requests</Button>
                            </Link>
                        </>
                    )}

                    {user?.roles.includes("student") && (
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
            </div>
        </>
    );
}

export default Layout;
