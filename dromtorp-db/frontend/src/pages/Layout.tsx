import { Link, Outlet } from "react-router-dom";

function Layout(): JSX.Element {
    return (
        <>
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/login"}>Log in</Link>
                <Link to={"/register"}>Register</Link>
            </nav>
            <div>
                <Outlet />
            </div>
            <footer>
                <p>Nuh uh</p>
            </footer>
        </>
    );
}

export default Layout;
