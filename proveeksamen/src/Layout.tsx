import { Link, Outlet } from "react-router-dom";

function Layout(): JSX.Element {
    return(
        <>
            <nav className="flex flex-row justify-evenly bg-gray-700 h-16 shadow-lg mb-12 py-2">
                <Link to="/" className="flex bg-gray-300 items-center px-6 rounded-md duration-200 hover:bg-gray-400">Hjem</Link>
                <Link to="/ticket" className="flex bg-gray-300 items-center px-6 rounded-md duration-200 hover:bg-gray-400">Se gjennom feilmeldinger</Link>
                <Link to="/ticket/create" className="flex bg-gray-300 items-center px-6 rounded-md duration-200 hover:bg-gray-400">Opprett en feilmelding</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout;