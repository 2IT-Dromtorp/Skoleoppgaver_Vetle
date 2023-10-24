import '../App.css';
import GetStudentName from "./components/Seat";
import { Elever } from './App';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Classmap = () => {
    const navigate = useNavigate();
    let className = "classgrid"

    const [elevPOV, setElevPOV] = useState(false)
    const [studentsList, setStudentsList] = useState(Elever)
    const [canDoNewRoll, setCanDoNewRoll] = useState(true)

    if (elevPOV){
        className = "classgrid reverse"
        console.log(elevPOV)
    } else{
        className = "classgrid"
        console.log(elevPOV)
    }

    function RandomizeList() {
        if (!canDoNewRoll){
            return;
        }

        let currentIndex = studentsList.length,  randomIndex;

        while (currentIndex > 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex--
      
          [studentsList[currentIndex], studentsList[randomIndex]] = [
            studentsList[randomIndex], studentsList[currentIndex]]
        }
        console.log(studentsList)
        console.log(Elever)

        setStudentsList([...studentsList])

        setCanDoNewRoll(false)
    }
    
    return(
        <div className='App'>
            <header className='App-header'>
                <button className="backToMenu" onClick={() => navigate('/')}>Tilbake til meny</button>
                <button onClick={() => RandomizeList()}>Randomize</button>
                <div className={className}>
                    <div><GetStudentName name={studentsList[0].fornavn}/></div>
                    <div><GetStudentName name={studentsList[1].fornavn}/></div>
                    <div><GetStudentName name={studentsList[2].fornavn}/></div>
                    <div></div>
                    <div><GetStudentName name={studentsList[3].fornavn}/></div>
                    <div><GetStudentName name={studentsList[4].fornavn}/></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div><GetStudentName name={studentsList[5].fornavn}/></div>
                    <div><GetStudentName name={studentsList[6].fornavn}/></div>
                    <div><GetStudentName name={studentsList[7].fornavn}/></div>
                    <div></div>
                    <div></div>
                    <div><GetStudentName name={studentsList[8].fornavn}/></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div><GetStudentName name={studentsList[9].fornavn}/></div>
                    <div><GetStudentName name={studentsList[10].fornavn}/></div>
                    <div><GetStudentName name={studentsList[11].fornavn}/></div>
                    <div></div>
                    <div><GetStudentName name={studentsList[12].fornavn}/></div>
                    <div><GetStudentName name={studentsList[13].fornavn}/></div>
                </div>
                <label>Elev POV: <input type='checkbox' defaultChecked onChange={e => setElevPOV(!e.target.checked)}></input></label>
            </header>
        </div>
        
    )
}

export default Classmap;