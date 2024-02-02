import { Outlet } from "react-router-dom"

function Layout(): JSX.Element {
    return(
        <div className="flex flex-row min-h-screen min-w-full justify-center">
            <Outlet />
        </div>
    )
}

export default Layout