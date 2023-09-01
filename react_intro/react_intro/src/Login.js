import { useState } from "react";
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

export default function LoginPage(){

    let Credentials = {
        User:[
        {Username: "MathoePanKan", Password: "Gris123"},
        {Username: "Frikk2015", Password: "#KniverIRyggen"},
        {Username: "EliasHGod", Password: "TheGOAT"},
        {Username: "JoakimHusefest", Password: "Laerer23-24"}
        ]
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [UsernameInput, setUsernameInput] = useState();
    const [PasswordInput, setPasswordInput] = useState();

    let logInContent;
    let logInButtonText;
  
    if (isLoggedIn){
        logInContent = (
            <div>
                <LoggedIn />
            </div>
        )
        logInButtonText = "Log out";
    } else {
        logInContent = (
            <div>
                <input type="text" placeholder="Username" onChange={e => setUsernameInput(e.target.value)}></input>
                <br />
                <input type="password" placeholder="Password" onChange={e => setPasswordInput(e.target.value)}></input>
                <LoggedOut />
            </div>
    )
    logInButtonText = "Log in";
    }
  
    function isLoggedInChange(boolean) {
        if (!isLoggedIn){
            for (let i in Credentials.User){
                if (UsernameInput === Credentials.User[i].Username && PasswordInput === Credentials.User[i].Password){
                    setIsLoggedIn(boolean);
                    setUsernameInput();
                    setPasswordInput();
                }
            }
        } else {
            setIsLoggedIn(boolean);
        }
    }
    return (
        <div>
            <br />
            <button onClick={() => isLoggedInChange(!isLoggedIn)}>{logInButtonText}</button>
            {logInContent}
        </div>
    )
}