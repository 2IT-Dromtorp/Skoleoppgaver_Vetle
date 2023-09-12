import { Elever } from "../App";
import { useState } from "react";
import GetStudentName from "./Seat";

const Filter = () => {
    const [CheckIn, setCheckIn] = useState("");
    const [CheckFor, setCheckFor] = useState("");
    const [Bool, setBool] = useState(true);

    let FilteredStudents = [];
    for (let i in Elever){
        if (CheckIn != ""){
            if (Elever[i][CheckIn].toLowerCase().includes(CheckFor.toLowerCase()) == Bool){
                FilteredStudents.push(<GetStudentName name={Elever[i].fornavn} key={i}/>)
            }
        } else {
            FilteredStudents.push(<GetStudentName name={Elever[i].fornavn} key={i}/>)
        }
    }

    return(
        <>
            <div className="filter">
                <label>Søk i: <select onChange={e => setCheckIn(e.target.value)}>
                    <option value={""}>Null filter</option>
                    <option value={"fornavn"}>Fornavn</option>
                    <option value={"etternavn"}>Etternavn</option>
                    <option value={"klasse"}>Klasse</option>
                    <option value={"fellesfaggruppe"}>Fellesfaggruppe</option>
                </select></label>
                <label>Søk etter: <input type="text" onChange={e => setCheckFor(e.target.value)}></input></label>
                <label>Motsatt søk: <input type="checkbox" onChange={e => setBool(!e.target.checked)}></input></label>
            </div>
            <div className="eleverboks">
                {FilteredStudents}
            </div>
        </>
    )
}

export default Filter