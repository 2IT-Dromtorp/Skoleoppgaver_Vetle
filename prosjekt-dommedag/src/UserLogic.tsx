import { Dispatch, SetStateAction } from "react";
import Login from "./Login";
import Register from "./Register";

function UserLogic({setPopupActive}: {setPopupActive : Dispatch<SetStateAction<boolean>>}): JSX.Element {
    return(
        <div className="h-full w-full flex flex-row justify-evenly">
            <Register />
            <Login setPopupActive={setPopupActive}/>
        </div>
    )
}

export default UserLogic