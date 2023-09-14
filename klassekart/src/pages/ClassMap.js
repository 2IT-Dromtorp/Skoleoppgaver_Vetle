import '../App.css';
import GetStudentName from "./components/Seat";
import { useNavigate } from 'react-router-dom';

const Classmap = () => {
    const navigate = useNavigate();
    let className = "classgrid"

    function ChangePOV(POV){
        if (POV){
            className += "classgrid reverse"
            console.log(POV)
        } else{
            className = "classgrid"
            console.log(POV)
        }
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
                <label>Elev POV: <input type='checkbox' onChange={e => ChangePOV(e.target.checked)}></input></label>
            </header>
        </div>
        
    )
}

export default Classmap;