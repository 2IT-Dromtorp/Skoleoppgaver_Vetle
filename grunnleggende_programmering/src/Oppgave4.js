import { useState } from "react"

let RanNum = Math.floor(Math.random() * 50);

function GetNewRanNum(){
    RanNum = Math.floor(Math.random() * 50);
}

function HigherOrLower(){
    const [UserGuess, setUserGuess] = useState(0);
    let Result;

    if (UserGuess == RanNum){
        Result = "Riktig tall!";
    }
    else if(UserGuess < RanNum){
        Result = "Tallet ditt er lavere";
    }
    else{
        Result = "Tallet ditt er høyere";
    }

    return(
        <>
            <input type="text" onChange={e => setUserGuess(e.target.value)} placeholder="Hvilket tall gjetter du?"/>
            {Result}
            <button onClick={() => GetNewRanNum}>Få et nytt tilfeldig tall</button>
        </>
    )
}

export default function Oppgave4(){
    return(
        <>
            <h1>Oppgave 4</h1>
            <HigherOrLower />
        </>
    )
}