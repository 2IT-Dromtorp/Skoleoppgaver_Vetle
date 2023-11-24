import Login from "./Login";
import Register from "./Register";

function UserLogic(): JSX.Element {
    return(
        <div className="h-full w-full flex flex-row justify-evenly">
            <Register />
            <Login />
        </div>
    )
}

export default UserLogic