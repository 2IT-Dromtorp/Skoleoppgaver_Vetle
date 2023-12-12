import { Link, Outlet } from "react-router-dom";
import ticketsImport from "./tickets.json";
import { useState } from "react";

function Layout(): JSX.Element {
    const ticketsType = [{"short": String, "long": String, "name": String, "priority": Number}]

    const [tickets, setTickets] = useState<typeof ticketsType>()
    setTickets([...tickets, ticketsImport])
    console.log(tickets);
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