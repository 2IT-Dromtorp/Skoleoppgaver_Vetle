import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TUser, sport } from "../assets/types";
import Input from "../assets/components/Input";

function Request(): JSX.Element {
    const navigate = useNavigate();
    const { sport } = useParams();

    const [user, setUser] = useState<TUser>();

    const [message, setMessage] = useState<string>("");

    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/api/sports");
                if (!res.data.some((s: sport) => s.name.toLowerCase() == sport?.toLowerCase())) navigate("/sports");

                const authRes = await axios.get("/api/check-auth", {
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setUser(authRes.data);
            } catch (err) {
                navigate("/login");
            }
        })();
    }, []);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const res = await axios.post("/api/join-sport", { name: user?.username, email, phone, sport });
            if (res.status === 201) setMessage(res.data);
            navigate("/sports");
        } catch (err) {
            setMessage("Noe gikk galt. Prøv igjen senere.");
        } finally {
            setEmail("");
            setPhone("");
        }
    }

    return (
        <div className="flex text-center justify-center">
            <form onSubmit={onSubmit} className="flex flex-col space-y-4 w-1/4">
                <h1 className="font-bold text-4xl">Spør om å bli med</h1>
                <Input
                    label="E-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="E-post"
                />
                <Input
                    label="Telefonnummer"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="number"
                    placeholder="Telefonnummer"
                />
                <p>{message}</p>
                <button className="p-2">Send forespørsel</button>
            </form>
        </div>
    );
}

export default Request;
