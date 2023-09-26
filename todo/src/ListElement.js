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

    function DeleteTask() {
        let todoTasksCopy = [...todoTasks.tasks];
        todoTasks.tasks = [];
        for (let i in todoTasksCopy){
            if (i != index){
                console.log("Keep task", i, todoTasksCopy[i]);
                todoTasks.tasks.push(todoTasksCopy[i])
            } else {
                console.log("Delete task", i, todoTasksCopy[i]);
            }
        }
        console.log("Updated todoTasks", todoTasks);
        updateList()
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
        todoTasks.tasks[index].name = name
        todoTasks.tasks[index].description = description
        return(
            <div className="listElement">
                <input type='checkbox' defaultChecked={todoTasks.tasks[index].isCompleted} onChange={e => {UpdateCompleted(e.target.checked);updateList()}}></input>
                <h2>{name}</h2>
                <p>{description}</p>
                <button onClick={() => setIsInEditMode(true)}>Edit</button>
                <button onClick={() => DeleteTask()}>Delete</button>
            </div>
        )
    }
}
export default ListElement;