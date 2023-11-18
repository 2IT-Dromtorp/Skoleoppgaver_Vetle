import { useState } from "react"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password)
        fetch("/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"username": username, "password": password})
            })
            .then((res) => {
                if (!res.ok){
                    throw new Error(`${res.status}`)
                }
                return res.json()
            })
            .then((data) => {
                console.log(data.result, data.error)
                navigate(`/${data.username}`)
            })
            .catch((error) => console.error("Error sending data:", error))
    }

    return(
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Username: <input type="username" value={username} onChange={e => setusername(e.target.value)}/></label>
                <label>Password: <input type="password" value={password} onChange={e => setpassword(e.target.value)}/></label>
                <input type="submit" className="submit" />
            </form>
        </>
    )
}
export default Login
