<script>
    let username = "";
    let password = "";

    function handleSubmit() {
        console.log(username);
        console.log(password);
    }
</script>

<h1>Login</h1>
<form
    on:submit={(e) => {
        e.preventDefault();
        handleSubmit();
    }}
>
    <input type="text" bind:value={username} />
    <input type="password" bind:value={password} />
    <button type="submit">Submit</button>
</form>