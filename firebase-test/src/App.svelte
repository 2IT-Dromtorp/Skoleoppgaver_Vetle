<script>
    import { Router, Link, Route } from "svelte-routing";
    import Home from "./routes/Home.svelte";
    import Login from "./routes/Login.svelte";
    import Register from "./routes/Register.svelte";
</script>

<Router>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </nav>
    <div>
        <Route path="/"><Home /></Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    </div>
</Router>
