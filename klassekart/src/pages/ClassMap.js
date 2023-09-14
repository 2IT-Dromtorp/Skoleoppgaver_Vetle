import '../App.css';
import GetStudentName from "./components/Seat";
import { useAsyncError, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Classmap = () => {
    const navigate = useNavigate();
    let className = "classgrid"

    const [elevPOV, setElevPOV] = useState(false)

    if (elevPOV){
        className = "classgrid reverse"
        console.log(elevPOV)
    } else{
        className = "classgrid"
        console.log(elevPOV)
    }
    
    return(
        <div className='App'>
            <header className='App-header'>
                <button className="backToMenu" onClick={() => navigate('/')}>Tilbake til meny</button>
                <div className={className}>
                    <div><GetStudentName name={"Matheo"}/></div>
                    <div><GetStudentName name={"Elias"}/></div>
                    <div><GetStudentName name={"Johannes"}/></div>
                    <div></div>
                    <div></div>
                    <div><GetStudentName name={"Gabriel"}/></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div><GetStudentName name={"Kristoffer"}/></div>
                    <div><GetStudentName name={"Vetle"}/></div>
                    <div><GetStudentName name={"Axel"}/></div>
                    <div></div>
                    <div><GetStudentName name={"Mattis"}/></div>
                    <div><GetStudentName name={"Philip"}/></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div><GetStudentName name={"Silas"}/></div>
                    <div><GetStudentName name={"Alva"}/></div>
                    <div><GetStudentName name={"Theodor"}/></div>
                    <div></div>
                    <div><GetStudentName name={"Ahmad"}/></div>
                    <div><GetStudentName name={"Andreas"}/></div>
                </div>
                <label>Elev POV: <input type='checkbox' defaultChecked onChange={e => setElevPOV(!e.target.checked)}></input></label>
            </header>
        </div>
        
    )
}

export default Classmap;