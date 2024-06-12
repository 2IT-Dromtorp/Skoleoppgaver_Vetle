import Input from "../assets/components/Input";

function Login(): JSX.Element {
    return (
        <div className="flex text-center justify-center">
            <form className="flex flex-col space-y-4 w-1/6">
                <h1 className="text-xl font-semibold">Logg inn</h1>
                <Input label="Brukernavn" type="text" placeholder="Brukernavn" />
                <Input label="Passord" type="password" placeholder="Passord" />
                <button className="p-2">Logg inn</button>
            </form>
        </div>
    );
}

export default Login;
