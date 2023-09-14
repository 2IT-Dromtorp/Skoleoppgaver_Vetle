import '../App.css';
import Filter from './components/Filter.js';
import { useNavigate } from 'react-router-dom';

const ClassMap = () => {
    const navigate = useNavigate();
    return(
        <div className='App'>
            <header className='App-header'>
                <button className='backToMenu' onClick={() => navigate('/')}>Tilbake til meny</button>
                <Filter />
            </header>
        </div>
    )
}

export default ClassMap;