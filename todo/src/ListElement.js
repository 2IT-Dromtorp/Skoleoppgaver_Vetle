import { useState } from "react";
import { todoTasks } from "./App";

const ListElement = ({index, updateList}) => {

    const [isInEditMode, setIsInEditMode] = useState(false);
    const [name, setName] = useState(todoTasks.tasks[index].name)
    const [description, setDescription] = useState(todoTasks.tasks[index].description)

    function UpdateCompleted(completed){
        todoTasks.tasks[index].isCompleted = completed;
        console.log(todoTasks);
    }

    if (isInEditMode){
        return(
            <div className="listElement">
                <input type='checkbox' defaultChecked={todoTasks.tasks[index].isCompleted} onChange={e => {UpdateCompleted(e.target.checked);updateList()}}></input>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                <button onClick={() => setIsInEditMode(false)}>Save</button>
                <button>Delete</button>
            </div>
        )
    } else {
        return(
            <div className="listElement">
                <input type='checkbox' defaultChecked={todoTasks.tasks[index].isCompleted} onChange={e => {UpdateCompleted(e.target.checked);updateList()}}></input>
                <h2>{name}</h2>
                <p>{description}</p>
                <button onClick={() => setIsInEditMode(true)}>Edit</button>
                <button>Delete</button>
            </div>
        )
    }
}
export default ListElement;