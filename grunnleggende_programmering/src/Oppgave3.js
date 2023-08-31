import { useState } from "react";

function CheckNationality(){
    const [TextValue, setTextValue] = useState('');
    let Nationality;

    if (TextValue.toLowerCase() == 'n'){
        Nationality = 'Du er norsk';
    }
    else if (TextValue.toLowerCase() == 's'){
        Nationality = 'Du er svensk';
    }
    else{
        Nationality = 'Du tilhører ikke noe land';
    }

    return(
        <>
            <input type="text" value={TextValue} onChange={e => setTextValue(e.target.value)}/>
            {Nationality}
        </>
    )
}

export default function Oppgave3(){
    return(
        <>
            <h1>Oppgave 3</h1>
            <CheckNationality />
        </>
    )
}