import data from './todo.json';
import List from './List';
import { useState } from 'react';


const MakeTask = () => {
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    
    function HandleSubmit() {
        data.tasks.push({"name": Name, "description": Description, "isCompleted": false});
        console.log(data);
    }

    return(
        <div className="maketask">
            <input type="text" placeholder="Navn" onChange={e => setName(e.target.value)}></input>
            <input type="text" placeholder="Beskrivelse" onChange={e => setDescription(e.target.value)}></input>
            <input type="submit" value="submit" onClick={HandleSubmit}></input>
        </div>
    )
}
export default MakeTask;