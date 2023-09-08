import '../App.css';
import { Elever } from './App';
import GetStudentName from './components/Seat.js'
import Filter from './components/Filter.js'

const ClassMap = () => {
    return(
        <div className='App'>
            <header className='App-header'>
                <Filter />
            </header>
        </div>
    )
}

export default ClassMap;