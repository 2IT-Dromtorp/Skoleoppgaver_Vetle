import { Elever } from './App.js'
import ChangeContent from './ChangeContent.js';

export default function GetStudentName(name){
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
        <button onClick={() => ChangeContent({typeOfContent: "profile", studentIndex: StudentIndex})}>{StudentName}</button>
      </>
    )
  }