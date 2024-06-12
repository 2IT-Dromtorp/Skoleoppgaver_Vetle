import { Outlet } from "react-router-dom";

function Layout(): JSX.Element {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Layout;
