import { useState } from "react";
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

export default function LoginPage(){

    let Credentials = {
        usernames: ['MathoePanKan', 'Frikk2015', 'EliasHGod'],
        passwords: ['Gris123', '#KniverIRyggen', 'TheGOAT']};

    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                <input type="text" id="username" placeholder="Username"></input>
                <br />
                <input type="password" id="password" placeholder="Password"></input>
                <LoggedOut />
            </div>
    )
    logInButtonText = "Log in";
    }
  
    function isLoggedInChange(boolean) {
        for (let x in Credentials.usernames){
            if (username.value === Credentials.usernames[x] && password.value === Credentials.passwords[x]){
                setIsLoggedIn(boolean);
                } 
            }
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