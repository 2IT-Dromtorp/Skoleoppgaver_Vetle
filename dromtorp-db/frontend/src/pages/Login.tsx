import axios from "axios";
import { useState } from "react";

function Login(): JSX.Element {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleSubmit() {
        axios
            .post("/api/login", { username: username, password: password })
            .then((res) => {
                if (res.status != 200) throw new Error("NO!");
                localStorage.setItem("jwt", res.data.jwt);
            });
    }

    return (
        <>
            <h1>Login</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <label>
                    <h2>Username</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    <h2>Password</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
        </>
    );
}

export default Login;
