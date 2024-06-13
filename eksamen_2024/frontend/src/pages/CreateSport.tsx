import { useState } from "react";
import Input from "../assets/components/Input";
import axios from "axios";

function CreateSport(): JSX.Element {
    const [message, setMessage] = useState<string>("");
    const [sport, setSport] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const res = await axios.post("/api/sport", { name: sport, description });
            if (res.status === 201) {
                setMessage("Sporten ble opprettet");
            } else {
                setMessage("Noe gikk galt");
            }
        } catch (error) {
            setMessage("Noe gikk galt");
        } finally {
            setSport("");
            setDescription("");
        }
    }

    return (
        <div className="flex text-center justify-center">
            <form onSubmit={onSubmit} className="flex flex-col space-y-4 w-1/4">
                <h1 className="font-bold text-4xl">Opprett et lag i en ny sport</h1>
                <Input
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    required
                    label="Sport"
                    type="text"
                    placeholder="Sport"
                />
                <label>
                    <p className="text-left">Beskrivelse</p>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Beskrivelse"
                        className="p-2 w-full bg-white border-secondary border rounded-lg focus:outline-none"
                    />
                </label>
                <p>{message}</p>
                <button className="p-2">Opprett lag</button>
            </form>
        </div>
    );
}

export default CreateSport;
