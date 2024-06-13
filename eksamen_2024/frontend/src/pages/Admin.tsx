import { useState } from "react";
import Input from "../assets/components/Input";
import axios from "axios";

function Admin(): JSX.Element {
    const [message, setMessage] = useState<string>("");

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await axios.put(
                "/api/change-password",
                { oldPassword, newPassword },
                { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            if (res.status === 200) {
                setMessage("Passordet ble endret");
            } else {
                setMessage("Feil passord");
            }
        } catch (err) {
            setMessage("Feil passord");
        }
    }

    return (
        <div className="flex flex-col text-center items-center">
            <h1 className="font-bold text-4xl mb-8">Admin side</h1>
            <form onSubmit={onSubmit} className="flex flex-col space-y-4 w-1/6">
                <h2 className="font-semibold text-2xl">Endre passord</h2>
                <Input
                    label="Gammelt passord"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    type="password"
                    placeholder="Gammelt passord"
                />
                <Input
                    label="Nytt passord"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    placeholder="Nytt passord"
                />
                <p>{message}</p>
                <button className="p-2">Endre</button>
            </form>
        </div>
    );
}

export default Admin;
