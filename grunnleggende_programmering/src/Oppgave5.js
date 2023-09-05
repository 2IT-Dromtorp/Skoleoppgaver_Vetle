import { useState } from "react"

function HigherOrLower(){
    const [RanNum, setRanNum] = useState(1);
    let ResultsArray = [25];
    let Computerguess = 25;
    let NumberOfGuesses = 1;

    function CalculateNumber(){
        while (Computerguess != RanNum && Computerguess < 50 && Computerguess > 1 && RanNum != ""){
            if(Computerguess < RanNum){
                Computerguess = Math.round(Computerguess + 25 / (2 ** NumberOfGuesses));
            }
            else{
                Computerguess = Math.round(Computerguess - 25 / (2 ** NumberOfGuesses));
            }
            ResultsArray.push(Computerguess);
            NumberOfGuesses++;
            console.log(RanNum)
        }
        let Result = ResultsArray.map((item, index) => <li key={index}>{item}</li>);
        return Result;
        
    }

    return(
        <>
            <p>Et tall mellom 1 og 50:</p>
            <input type="number" placeholder="1" onChange={e => setRanNum(e.target.value)} min="1" max="50" />
            <ul>{CalculateNumber()}</ul>
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