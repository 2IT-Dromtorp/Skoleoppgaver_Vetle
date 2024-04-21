import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/assets/Types";

function AddEquipment(): JSX.Element {
    const { data: user } = useQuery<User>({
        queryKey: ["user"],
    });

    const [name, setName] = useState<string>("");

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
            {["admin", "teacher"].some((str) => user?.roles.includes(str)) ? (
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
