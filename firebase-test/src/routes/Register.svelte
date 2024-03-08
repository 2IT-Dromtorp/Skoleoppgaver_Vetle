<script>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { app } from '../firebase.js';

    let mail = "";
    let password = "";

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const credentials = await createUserWithEmailAndPassword(
                getAuth(app),
                mail,
                password
            );
            console.log(credentials);
            console.log(mail);
            console.log(password);
        } catch (err) {
            console.error(err);
        }
    }
</script>

<h1>Register</h1>
<form
    on:submit={handleSubmit}
>
    <input type="email" bind:value={mail} />
    <input type="password" bind:value={password} />
    <button type="submit">Submit</button>
</form>
