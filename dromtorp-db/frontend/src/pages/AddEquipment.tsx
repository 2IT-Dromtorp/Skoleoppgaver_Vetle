import { useState } from "react";
import axios from "axios";
import { checkRoles } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/assets/Types";

function AddEquipment(): JSX.Element {
    const [name, setName] = useState<string>("");

    const { data: user } = useQuery<User>({
        queryKey: ["user"],
    });

    async function onSubmit() {
        console.log(name);

        await axios.post(
            "/api/addEquipment",
            { name: name },
            { headers: { Authorization: localStorage.getItem("jwt") } }
        );
    }

    return (
        <>
            {checkRoles(["admin", "teacher"], user?.roles || []) ? (
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
                <p>You do not have access to this page</p>
            )}
        </>
    );
}

export default AddEquipment;
