import { useEffect, useState } from "react";
import CheckAuthority from "../assets/CheckAuthority";

function AddStudent(): JSX.Element {
    const [hasAccess, setAccess] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            console.log("a");
            setAccess(await CheckAuthority(2));
        })();
    }, []);

    return (
        <>
            {hasAccess ? (
                <p>nah</p>
            ) : (
                <p>You do not have access to this page</p>
            )}
        </>
    );
}

export default AddStudent;
