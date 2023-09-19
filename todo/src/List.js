import data from './todo.json';
import ListElement from "./ListElement";

const List = () => {
    let Tasks = [];
    for (let i in data.tasks){
        Tasks.push(<ListElement name={data.tasks[i].name} description={data.tasks[i].description} isCompleted={data.tasks[i].isCompleted} key={i} />)
    }
    return(
        <div className="todolist">
            {Tasks}
        </div>
    )
}
export default List;