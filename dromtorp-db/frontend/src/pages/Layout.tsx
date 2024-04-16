import { Link, Outlet } from "react-router-dom";

function Layout(): JSX.Element {
    return (
        <div className="relative min-h-screen">
            <nav className="flex w-full justify-evenly bg-slate-700 py-3">
                <Link to={"/"} className="bg-slate-400 py-4 px-10 rounded-sm">Home</Link>
                <Link to={"/login"} className="bg-slate-400 py-4 px-10 rounded-sm">Log in</Link>
                <Link to={"/addStudent"} className="bg-slate-400 py-4 px-10 rounded-sm">Add student</Link>
            </nav>
            <div>
                <Outlet />
            </div>
            <footer className="absolute bottom-0 w-full justify-evenly bg-slate-700 py-3">
                <p>Fin footer</p>
            </footer>
        </div>
    );
}

export default Layout;
