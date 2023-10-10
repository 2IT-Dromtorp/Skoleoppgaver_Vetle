import { useState } from "react"

const Register = () => {
    const [mail, setmail] = useState("")
    const [password, setpassword] = useState("")
    const [username, setUsername] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"mail": mail, "password": password, "username": username})
            })
            .then((res) => {
              if (!res.ok){
                throw new Error(`Request failed with status ${res.status}`)
              }
            })
            .catch((error) => console.error("Error sending data:", error))
    }

    return(
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Mail: <input type="text" value={mail} onChange={e => setmail(e.target.value)}/></label>
                <label>Password: <input type="password" value={password} onChange={e => setpassword(e.target.value)}/></label>
                <label>Username: <input type="text" value={username} onChange={e => setUsername(e.target.value)}/></label>
                <input type="submit"></input>
            </form>
        </>
    )
}
export default Register