import { Link } from "react-router-dom";

interface NavElementProps {
    route: string;
    children: React.ReactNode;
}

function NavElement({ route, children }: NavElementProps): JSX.Element {
    return (
        <Link to={route}>
            <button className="py-4 px-6 text-lg font-semibold rounded-lg duration-200 m-2 bg-primary hover:brightness-[.85]">
                {children}
            </button>
        </Link>
    );
}

export default NavElement;
