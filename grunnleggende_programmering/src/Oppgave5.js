import { useState } from "react"

function HigherOrLower(){
    const [RanNum, setRanNum] = useState(0);
    let ResultsArray = [];
    let Computerguess = 25;
    let Results;

    while (Computerguess != RanNum && RanNum > 0 && RanNum < 50){
        if(Computerguess < RanNum){
            Computerguess = Math.round(Computerguess * 1.5);
        }
        else{
            Computerguess = Math.round(Computerguess * 0.5);
        }
        ResultsArray.push(Computerguess);
    }

    for (let i in ResultsArray){
        Results = Results + ', ' + ResultsArray[i]; 
    }

    return(
        <>
            <input type="text" onChange={e => setRanNum(e.target.value)} placeholder="Hvilket tall skal datamaskin gjette på? (mellom 1 og 49)"/>
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