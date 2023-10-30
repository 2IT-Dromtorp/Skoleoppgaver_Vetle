import { useNavigate, useParams } from 'react-router-dom';

const User = () => {
    let { username } = useParams();

    return(
        <>
            <h1>{username}</h1>
            
        </>
    )
}
export default User