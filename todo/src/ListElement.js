import { todoTasks } from "./App";

const ListElement = ({name, description, isCompleted, index}) => {
    function UpdateCompleted(completed){
        todoTasks.tasks[index].isCompleted = completed;
        console.log(todoTasks);
    }
    return(
        <div className="listelement">
            <input type='checkbox' defaultChecked={isCompleted} onChange={e => UpdateCompleted(e.target.checked)}></input>
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    )
}
export default ListElement;