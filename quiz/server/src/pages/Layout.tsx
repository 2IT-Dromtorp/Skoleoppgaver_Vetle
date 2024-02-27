import { Outlet } from "react-router-dom";

function Layout(): JSX.Element {
    return (
        <>
            <div className="fixed w-full h-screen bg-[url('./assets/starry-night-sky.jpg')] bg-cover bg-center -z-10" />
            <div className="flex flex-row min-h-screen h-content min-w-full justify-center text-text text-4xl font-bold">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
