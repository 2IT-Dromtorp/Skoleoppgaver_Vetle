import { useState } from "react"

const Register = () => {
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === "") return
        fetch("/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"username": username, "password": password})
            })
            .then((res) => {
                if (!res.ok){
                    throw new Error(`Request failed with status ${res.status}`)
                }
                return res.json()
            })
            .then((data) => {
                console.log(data.status)
                setUsername("")
                setPassword("")
            })
            .catch((error) => console.error("Error sending data:", error))
    }

    return(
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Username: <input type="text" value={username} onChange={e => setUsername(e.target.value)}/></label>
                <label>Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)}/></label>
                <input type="submit" className="submit" />
            </form>
        </>
    )
}
export default Register
