import { Dispatch, SetStateAction, useState } from "react";
import { FetchLogin, FetchRegister } from "./Fetch";

function Register({setPopupActive}: {setPopupActive : Dispatch<SetStateAction<boolean>>}): JSX.Element {
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    async function HandleSubmit(): Promise<void> {
        const rawResponse = await FetchRegister(name, mail, password)
        const response: {message: string, error?: Error} = await rawResponse.json()
        console.log(response.message)
        if (response.error === undefined)return
        await FetchLogin(mail, password)
        if (document.cookie === "")return
        setPopupActive(false)
    }

    return(
        <div className="h-10/12 w-5/12 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Lag en ny bruker</h2>
            <form onSubmit={e => {e.preventDefault();console.log("b");HandleSubmit()}}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Navn
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    E-post
                    <input type="email" value={mail} onChange={e => setMail(e.target.value)} required={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Passord
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required={true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <input type="submit" className="px-4 py-3 rounded-md bg-green-500 cursor-pointer duration-200 hover:bg-green-600 shadow" />
            </form>
        </div>
    )
}

export default Register