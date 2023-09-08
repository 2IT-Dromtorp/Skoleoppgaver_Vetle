import '../App.css';
import { Elever } from './App';
import GetStudentName from './components/Seat.js'
import Filter from './components/Filter.js'

const ClassMap = () => {
    return(
        <div className='App'>
            <header className='App-header'>
                <Filter />
                {GetStudentName("Andreas")}
                {GetStudentName("Ahmad")}
                {GetStudentName("Theodor")}
                {GetStudentName("Alva")}
                {GetStudentName("Silas")}
                {GetStudentName("Philip")}
                {GetStudentName("Mattis")}
                {GetStudentName("Axel")}
                {GetStudentName("Vetle")}
                {GetStudentName("Kristoffer")}
                {GetStudentName("Gabriel")}
                {GetStudentName("Johannes")}
                {GetStudentName("Elias")}
                {GetStudentName("Matheo")}
            </header>
        </div>
    )
}

export default ClassMap;