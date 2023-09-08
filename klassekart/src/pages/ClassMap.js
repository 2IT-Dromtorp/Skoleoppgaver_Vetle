import '../App.css';
import GetStudentName from './Seat.js'

const ClassMap = () => {
    return(
    <div className='App'>
        <header className='App-header'>
            <div className="seterad">
                {GetStudentName("Andreas")}
                {GetStudentName("Ahmad")}
            </div>
            <div className="seterad">
                {GetStudentName("Theodor")}
                {GetStudentName("Alva")}
                {GetStudentName("Silas")}
            </div>
            <div className="seterad">
                {GetStudentName("Philip")}
                {GetStudentName("Mattis")}
            </div>
            <div className="seterad">
                {GetStudentName("Axel")}
                {GetStudentName("Vetle")}
                {GetStudentName("Kristoffer")}
            </div>
            <div className="seterad">
                {GetStudentName("Gabriel")}
            </div>
            <div className="seterad">
                {GetStudentName("Johannes")}
                {GetStudentName("Elias")}
                {GetStudentName("Matheo")}
            </div>
        </header>
      </div>
    )
}

export default ClassMap;