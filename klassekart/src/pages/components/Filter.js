import { Elever } from "../App";
import { useState } from "react";
import GetStudentName from "./Seat";

const Filter = () => {
    const [CheckIn, setCheckIn] = useState("");
    const [CheckFor, setCheckFor] = useState("");
    let FilteredStudents = [];
    for (let i in Elever){
        if (CheckIn != ""){
            if (Elever[i][CheckIn].toLowerCase().includes(CheckFor.toLowerCase())){
                FilteredStudents.push(<GetStudentName name={Elever[i].fornavn} key={i}/>)
            }
        } else {
            FilteredStudents.push(<GetStudentName name={Elever[i].fornavn} key={i}/>)
        }
    }

    return(
        <>
            <select onChange={e => setCheckIn(e.target.value)}>
                <option value={""}>Null filter</option>
                <option value={"fornavn"}>Fornavn</option>
                <option value={"etternavn"}>Etternavn</option>
                <option value={"klasse"}>Klasse</option>
                <option value={"fellesfaggruppe"}>Fellesfaggruppe</option>
            </select>
            <input type="text" onChange={e => setCheckFor(e.target.value)}></input>
            {FilteredStudents}
        </>
    )
}

export default Filter