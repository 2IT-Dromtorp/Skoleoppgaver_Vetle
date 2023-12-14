import { useContext, useState } from "react";
import { TicketsContext } from "./App";

function Create() {
    const { tickets, setTickets } = useContext(TicketsContext);

    const [short, setShort] = useState("");
    const [long, setLong] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [fullDate, setFullDate] = useState(new Date())

    function HandleSubmit() {
        setFullDate(new Date());
        function AddDigit(i) {
            if (i < 10) i = "0" + i;
            return i;
        }
        const date = `${AddDigit(fullDate.getDate())}.${AddDigit(fullDate.getMonth() + 1)}.${fullDate.getFullYear()}`;
        const time = `${AddDigit(fullDate.getHours())}:${AddDigit(fullDate.getMinutes())}`;

        setTickets([...tickets, {"short": short, "long": long, "name": name, "date": date, "time": time, "done": false}]);

        setShort("")
        setLong("")
        setName("")
        setMessage("Feilmeldingen er lagt til")
    }

    return(
        <div className="flex flex-col items-center">
            <h1 className="font-extrabold text-3xl text-gray-800 mb-4">Opprett en feilmelding</h1>
            <form onSubmit={e => {e.preventDefault();HandleSubmit()}} className="flex flex-col border-gray-700 border rounded-2xl p-4 w-2/5 shadow-2xl">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Kort beskrivelse av problemet:
                    <input onChange={e => setShort(e.target.value)} value={short} type="text" required={true} className="border bg-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" />
                </label>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Lenger beskrivelse av problemet:
                    <textarea onChange={e => setLong(e.target.value)} value={long} required={true} className="border bg-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 h-64" />
                </label>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Ditt navn:
                    <input onChange={e => setName(e.target.value)} value={name} type="text" required={true} className="border bg-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" />
                </label>
                <label>
                    {message}
                    <input type="submit" className="border bg-gray-300 text-sm font-medium text-gray-900 rounded-lg w-full p-2.5 duration-200 cursor-pointer hover:bg-gray-400" />
                </label>
            </form>
        </div>
    )
}

export default Create;