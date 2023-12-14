import { Link, Outlet } from "react-router-dom";

function Layout() {
    return(
        <>
            <div className="min-h-[100vh] w-full relative bg-slate-300">
                <nav className="flex flex-row justify-evenly bg-gray-700 h-16 shadow-lg mb-12 py-2">
                    <Link to="/" className="flex bg-gray-300 items-center px-6 rounded-md duration-200 hover:bg-gray-400">Hjem</Link>
                    <Link to="/ticket" className="flex bg-gray-300 items-center px-6 rounded-md duration-200 hover:bg-gray-400">Se gjennom feilmeldinger</Link>
                    <Link to="/ticket/create" className="flex bg-gray-300 items-center px-6 rounded-md duration-200 hover:bg-gray-400">Opprett en feilmelding</Link>
                </nav>
                <div className="">
                    <Outlet />
                </div>
                <footer className="bg-gray-700 shadow-lg py-2 absolute bottom-0 w-full p-4 text-gray-300 text-sm">
                    <h1 className="font-bold">Kontaktinformasjon</h1>
                    <p>Tlf: +47 941 65 546</p>
                    <p>E-post: kontakt@vth.no</p>
                    <p>Adresse: Akersgata 55, 0180 Oslo</p>
                </footer>
            </div>
        </>
    )
}

export default Layout;