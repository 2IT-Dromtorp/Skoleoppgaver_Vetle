import { Outlet } from "react-router-dom"

function Layout(): JSX.Element {
    return(
        <div className="flex flex-row min-h-screen h-content min-w-full justify-center bg-main1 text-text text-4xl font-bold">
            <Outlet />
        </div>
    )
}

export default Layout