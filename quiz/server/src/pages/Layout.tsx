import { Outlet } from "react-router-dom";
// bg-[url('./assets/starry-night-sky.jpg')]
function Layout(): JSX.Element {
    return (
        <>
            <div
                className={
                    "fixed w-full h-screen bg-main1  bg-cover bg-center -z-10"
                }
            />
            <div className="flex flex-row min-h-screen h-content min-w-full justify-center text-text text-4xl font-bold">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
