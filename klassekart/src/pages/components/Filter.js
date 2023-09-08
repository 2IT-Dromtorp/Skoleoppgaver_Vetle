import { Elever } from "../App";
import { useState } from "react";

const Filter = () => {
    const [CheckIn, setCheckIn] = useState();
    const [ChekFor, setCheckFor] = useState();
    for (let i in Elever){
        console.log(i);
    }
    console.log(CheckIn);
    console.log(ChekFor);

    return(
        <>
            <select onChange={e => setCheckIn(e.target.value)}>
                <option value={"fornavn"}>Fornavn</option>
                <option value={"etternavn"}>Etternavn</option>
                <option value={"klasse"}>Klasse</option>
                <option value={"fellesfaggruppe"}>Fellesfaggruppe</option>
            </select>
            <input type="text" onChange={e => setCheckFor(e.target.value)}></input>
        </>
    )
}

export default Filter