import { useEffect, useState } from "react";
import Input from "../assets/components/Input";
import axios from "axios";
import { sport } from "../assets/types";

function CreateTournament(): JSX.Element {
    const [message, setMessage] = useState<string>("");
    const [sports, setSports] = useState<sport[]>([]);

    const [sport, setSport] = useState<string>("Fotball");
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [place, setPlace] = useState<string>("");
    const [skillLevel, setSkillLevel] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const sportsRes = await axios.get("/api/sports");
                setSports(sportsRes.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const res = await axios.post(
                "/api/tournament",
                { sport, name, date, time, place, skillLevel, description },
                { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            if (res.status === 201) {
                setMessage("Turneringen ble opprettet");
            } else {
                setMessage("Noe gikk galt");
            }
        } catch (error) {
            setMessage("Noe gikk galt");
        } finally {
            setName("");
            setDescription("");
        }
    }

    return (
        <div className="flex text-center justify-center">
            <form onSubmit={onSubmit} className="flex flex-col space-y-4 w-1/4 pb-8">
                <h1 className="font-bold text-4xl">Legg til en kommende turnering</h1>
                <label>
                    <p className="text-left">Sport</p>
                    <select
                        onChange={(e) => setSport(e.target.value)}
                        className="p-2 w-full bg-white border-secondary border rounded-lg focus:outline-none"
                    >
                        {sports.map((sport) => {
                            return (
                                <option key={sport._id} value={sport.name}>
                                    {sport.name}
                                </option>
                            );
                        })}
                    </select>
                </label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    label="Navn"
                    type="text"
                    placeholder="Navn"
                />
                <Input label="Dato" required type="date" onChange={(e) => setDate(e.target.value)} />
                <Input label="Tid" required type="time" onChange={(e) => setTime(e.target.value)} />
                <Input label="Sted" value={place} placeholder="Sted" required onChange={(e) => setPlace(e.target.value)} />
                <Input
                    label="Ferdighetsnivå"
                    required
                    value={skillLevel}
                    placeholder="Alle, erfarne, nybegynnere, etc."
                    onChange={(e) => setSkillLevel(e.target.value)}
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
                <button className="p-2">Opprett turnering</button>
            </form>
        </div>
    );
}

export default CreateTournament;
