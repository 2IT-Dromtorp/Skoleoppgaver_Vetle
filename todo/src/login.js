import { useState } from "react"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [mail, setmail] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(mail, password)
        fetch("/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"mail": mail, "password": password})
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
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Mail: <input type="text" value={mail} onChange={e => setmail(e.target.value)}/></label>
                <label>Password: <input type="password" value={password} onChange={e => setpassword(e.target.value)}/></label>
                <input type="submit"></input>
            </form>
            <button onClick={() => navigate('/register')}>Register</button>
        </>
    )
}
export default Login