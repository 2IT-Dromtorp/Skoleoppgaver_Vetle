import { useState } from "react";

function Create(): JSX.Element {
    const [short, setShort] = useState("");
    const [long, setLong] = useState("");
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    function HandleSubmit() {
        console.log(short);
        console.log(long);
        console.log(name);
        console.log(room);
    }

    return(
        <>
            <form onSubmit={e => {e.preventDefault();HandleSubmit()}} className="flex flex-col border-lime-700 border rounded-2xl p-4 w-2/5 shadow-2xl">
                <label className="block mb-2 text-sm font-medium text-gray-900">Kort beskrivelse av problemet:
                    <input onChange={e => setShort(e.target.value)} value={short} type="text" required={true} className="border bg-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"></input>
                </label>
                <label className="block mb-2 text-sm font-medium text-gray-900">Lenger beskrivelse av problemet:
                    <input onChange={e => setLong(e.target.value)} value={long} type="text" required={true} className="border bg-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 h-64"></input>
                </label>
                <label className="block mb-2 text-sm font-medium text-gray-900">Ditt navn:
                    <input onChange={e => setName(e.target.value)} value={name} type="text" required={true} className="border bg-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"></input>
                </label>
                <label className="block mb-2 text-sm font-medium text-gray-900">Hvilket rom:
                    <input onChange={e => setRoom(e.target.value)} value={room} type="text" required={true} className="border bg-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"></input>
                </label>
                <input type="submit" className="border bg-gray-300 text-sm font-medium text-gray-900 rounded-lg w-full p-2.5 duration-200 cursor-pointer hover:bg-gray-400"></input>
            </form>
        </>
    )
}

export default Create;