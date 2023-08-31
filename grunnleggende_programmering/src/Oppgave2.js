import { useState } from "react";

function OppgaveA(){
    return(
        <>
            <h2>Oppgave A</h2>
            {CalculateAreaOfRectangle(8, 8, "meter")}
        </>
    )
}
function CalculateAreaOfRectangle(width, height, measurement){
    let area = width * height;
    return(
        <p>Rektangelet er {area} kvadrat{measurement}</p>
    )
}
function OppgaveB() {
    return(
        <>
            <h2>Oppgave B</h2>
            {CalculateAreaOfTriangle(9, 3, "meter")}
        </>
    )
}
function CalculateAreaOfTriangle(width, height, measurement){
    let area = width * height / 2;
    return(
        <p>Trekanten er {area} kvadrat{measurement}</p>
    )
}
function OppgaveC() {
    const [Width, setWidth] = useState(0);
    const [Height, setHeight] = useState(0);
    function CalculateArea(width, height, measurement){
        return(
            <>
                {CalculateAreaOfRectangle(width, height, measurement)}
                {CalculateAreaOfTriangle(width, height, measurement)}
            </>
        )
    }
    return(
        <>
            <h2>Oppgave C</h2>
            <input type="text" onChange={e => setWidth(e.target.value)} placeholder="Width"/>
            <br />
            <input type="text" onChange={e => setHeight(e.target.value)} placeholder="Height"/>
            {CalculateArea(Width, Height)}
        </>
    )
}

export default function Oppgave2(){
    return(
        <>
            <h1>Oppgave 2</h1>
            <OppgaveA />
            <OppgaveB />
            <OppgaveC />
        </>
    )
}