import { useState } from "react"

function HigherOrLower(){
    const [RanNum, setRanNum] = useState(0);
    let ResultsArray = [25];
    let Computerguess = 25;
    let NumberOfGuesses = 1;

    function CalculateNumber(){
        while (Computerguess != RanNum){
            if(Computerguess < RanNum){
                Computerguess = Math.round(Computerguess + 25 / (2 ** NumberOfGuesses));
            }
            else{
                Computerguess = Math.round(Computerguess - 25 / (2 ** NumberOfGuesses));
            }
            ResultsArray.push(Computerguess);
            NumberOfGuesses++;
            //console.log(ResultsArray)
        }
    }

    return(
        <>
            <input type="number" onChange={e => setRanNum(e.target.value)} placeholder="Tall mellom 1 og 49" min="1" max="49" />
            <button onClick={() => CalculateNumber()}>Guess</button>
            {ResultsArray.map((items) => {
                console.log(items);
            })}
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