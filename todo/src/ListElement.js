import { todoTasks } from "./App";

const ListElement = ({index}) => {
    function UpdateCompleted(completed){
        todoTasks.tasks[index].isCompleted = completed;
        console.log(todoTasks);
    }
    return(
        <div className="listelement">
            <input type='checkbox' defaultChecked={todoTasks.tasks[index].isCompleted} onChange={e => UpdateCompleted(e.target.checked)}></input>
            <h2>{todoTasks.tasks[index].name}</h2>
            <p>{todoTasks.tasks[index].description}</p>
        </div>
    )
}
export default ListElement;