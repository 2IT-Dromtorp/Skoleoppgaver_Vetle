import '../App.css';
import { Elever } from './App';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    let { elevIndex } = useParams();
    if (elevIndex == null){
        elevIndex = 0;
    }
    return(
        <div className='App'>
            <header className='App-header'>
                <h2>{Elever[elevIndex].fornavn} {Elever[elevIndex].etternavn}</h2>
                <p>Epost: {Elever[elevIndex].epost}</p>
                <p>Klasse: {Elever[elevIndex].klasse}</p>
                <p>fellesfaggruppe: {Elever[elevIndex].fellesfaggruppe}</p>
                <button onClick={() => navigate('../classmap/')}>Tilbake til klassekart</button>
            </header>
        </div>
    )
}

export default Profile;