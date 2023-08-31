import { useState } from "react"

function HigherOrLower(){
    const [RanNum, setRanNum] = useState(0);
    let Result;
    let Computerguess;

    if (Computerguess == RanNum){
        Result = "Riktig tall!";
    }
    else if(Computerguess < RanNum){
        Result = "Tallet ditt er lavere";
    }
    else{
        Result = "Tallet ditt er høyere";
    }

    return(
        <>
            <input type="text" onChange={e => setRanNum(e.target.value)} placeholder="Hvilket tall gjetter du?"/>
            {Result}
        </>
    )
}

export default function Oppgave5(){
    return(
        <>
            <h1>Oppgave 5</h1>
            <HigherOrLower />
        </>
    )
}