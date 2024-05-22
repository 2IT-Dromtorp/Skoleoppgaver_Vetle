import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

function Layout(): JSX.Element {
    return (
        <>
            <nav>
                <h1>Layout</h1>
            </nav>
            <div>
                <Outlet />
            </div>
            <Toaster />
        </>
    );
}

export default Layout;
