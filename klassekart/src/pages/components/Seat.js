import { Elever } from '../App.js'
import { useNavigate } from 'react-router-dom';

const GetStudentName = (name) => {
  const navigate = useNavigate();
  let StudentName;
  let StudentIndex;

  for(let i in Elever){
    if (Elever[i].fornavn == name){
      StudentName = Elever[i].fornavn + " " + Elever[i].etternavn
      StudentIndex = i;
    }
  }

  return(
    <>
      <button onClick={() => navigate(`../profile/${StudentIndex}`)}>{StudentName}</button>
    </>
  )
}

export default GetStudentName;