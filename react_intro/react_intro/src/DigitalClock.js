import { useState } from "react";

export default function DigitalClock(){
    const[time, setTime] = useState(new Date)
    let hh = time.getHours()
    let mm = time.getMinutes()
    let ss = time.getSeconds()
    setInterval(() =>{
        setTime(new Date)
        hh = time.getHours
        mm = time.getMinutes
        ss = time.getSeconds
    }, 400)

    return(
        <div className="App">
            <header className="App-header">
                <h1>Klokke</h1>
                <p>{hh}:{mm}:{ss}</p>
            </header>
        </div>
    )
}