<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { app } from "../firebase.js";

    let mail = "";
    let password = "";

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await signInWithEmailAndPassword(
                getAuth(app),
                mail,
                password
            );
            localStorage.setItem("jwt", await result.user.getIdToken());
        } catch (err) {
            console.error(err);
        }
    }
</script>

<h1>Login</h1>
<form on:submit={handleSubmit}>
    <input type="text" bind:value={mail} />
    <input type="password" bind:value={password} />
    <button type="submit">Submit</button>
</form>
