import { useState } from "react";

const ListElement = ({index, todoTasks, setTodoTasks}) => {

    const [isInEditMode, setIsInEditMode] = useState(false);
    const [name, setName] = useState(todoTasks[index].name)
    const [description, setDescription] = useState(todoTasks[index].description)

    function UpdateCompleted(completed){
        let todoTasksCopy = [...todoTasks];
        todoTasksCopy[index].isCompleted = completed
        setTodoTasks(todoTasksCopy)
    }

    function DeleteTask() {
        setTodoTasks((todoTasksCopy) => todoTasksCopy = todoTasks.filter((item) => item.id !== todoTasks[index].id))
    }      

    if (isInEditMode){

        return(
            <div className="listElement">
                <input type='checkbox' defaultChecked={todoTasks[index].isCompleted} onChange={e => UpdateCompleted(e.target.checked)} />
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                <button onClick={() => setIsInEditMode(false)}>Save</button>
                <button>Delete</button>
            </div>
        )
    } else {
        todoTasks[index].name = name
        todoTasks[index].description = description
        return(
            <div className="listElement">
                <input type='checkbox' defaultChecked={todoTasks[index].isCompleted} onChange={e => UpdateCompleted(e.target.checked)} />
                <h2>{name}</h2>
                <p>{description}</p>
                <button onClick={() => setIsInEditMode(true)}>Edit</button>
                <button onClick={() => DeleteTask()}>Delete</button>
            </div>
        )
    }
}
export default ListElement;