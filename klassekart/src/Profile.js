import { Elever } from './App';

export default function Profile({student}){
    console.log("startet profile function")
    return(
        <>
            <h2>{Elever[student].fornavn} {Elever[student].etternavn}</h2>
            <p>Epost: {Elever[student].epost}</p>
            <p>Klasse: {Elever[student].klasse}</p>
            <p>fellesfaggruppe: {Elever[student].fellesfaggruppe}</p>
        </>
    )
}