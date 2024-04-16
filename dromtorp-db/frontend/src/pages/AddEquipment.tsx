import { useEffect, useState } from "react";
import CheckAuthority from "../assets/CheckAuthority";
import axios from "axios";

function AddEquipment(): JSX.Element {
    const [hasAccess, setAccess] = useState<boolean>(false);

    const [name, setName] = useState<string>("");

    useEffect(() => {
        (async () => {
            setAccess(await CheckAuthority(2));
        })();
    }, []);

    async function onSubmit() {
        console.log(name);

        await axios.post("/api/addEquipment", {name: name})
    }

    return (
        <>
            {hasAccess ? (
                <>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        <label>
                            <h2>Name</h2>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <input type="submit" />
                    </form>
                </>
            ) : (
                <p>no access</p>
            )}
        </>
    );
}

export default AddEquipment;
