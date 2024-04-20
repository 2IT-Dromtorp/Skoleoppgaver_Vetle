import { Button } from "@/components/ui/Button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function Layout(): JSX.Element {
    const queryClient = new QueryClient();
    axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("jwt");

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools client={queryClient} />
            <div className="bg-background text-foreground relative min-h-screen">
                <nav className="flex w-full justify-evenly py-3">
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
            </div>
        </QueryClientProvider>
    );
}

export default Layout;
