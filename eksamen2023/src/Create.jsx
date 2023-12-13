import { useContext, useState } from "react";
import { TicketsContext } from "./App";

function Create() {
    const { tickets, setTickets } = useContext(TicketsContext);

    const [short, setShort] = useState("");
    const [long, setLong] = useState("");
    const [name, setName] = useState("");
    const [priority, setPriority] = useState(0);
    const [date, setDate] = useState(new Date())

    function HandleSubmit() {
        console.log(short);
        console.log(long);
        console.log(name);
        console.log(priority);
        setDate(new Date());
        console.log(date);
        setTickets([...tickets, {"short": short, "long": long, "name": name, "priority": priority, "date": `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`, "time": `${date.getHours()}:${date.getMinutes()}`, "done": false}]);
    }

    return(
        <div className="flex flex-col items-center">
            <form onSubmit={e => {e.preventDefault();HandleSubmit()}} className="flex flex-col border-lime-700 border rounded-2xl p-4 w-2/5 shadow-2xl">
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
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Hvor viktig er problemet:
                    <input onChange={e => setPriority(e.target.valueAsNumber)} value={priority} type="number" required={true} className="border bg-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" />
                </label>
                <input type="submit" className="border bg-gray-300 text-sm font-medium text-gray-900 rounded-lg w-full p-2.5 duration-200 cursor-pointer hover:bg-gray-400" />
            </form>
        </div>
    )
}

export default Create;