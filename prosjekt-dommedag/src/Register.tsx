import { useState } from "react";

function Register(): JSX.Element {
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    async function HandleSubmit(): Promise<void> {
        if ((name.length <= 0) && (mail.length <= 0) && (password.length <= 0)) {console.log("feil");return}
        const rawResponse = await fetch("/api/register",
        {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: name, mail: mail, password: password})
        })
        const response: {message: string, error?: Error} = await rawResponse.json()
        console.log(response.message)
    }

    return(
        <div className="h-10/12 w-5/12 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Lag en bruker</h2>
            <form onSubmit={e => {e.preventDefault();console.log("b");HandleSubmit()}}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Navn
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    E-post
                    <input type="email" value={mail} onChange={e => setMail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Passord
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <input type="submit" className="px-4 py-3 rounded-md bg-green-500 cursor-pointer duration-200 hover:bg-green-600 shadow" />
            </form>
        </div>
    )
}

export default Register