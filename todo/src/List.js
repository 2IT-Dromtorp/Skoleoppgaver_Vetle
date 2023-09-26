import { useEffect, useState } from "react";
import ListElement from "./ListElement";

let Tasks = [];

const List = ({todoTasks}) => {
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [includeCompleted, setIncludeCompleted] = useState();

    // Tasks = [];
    // for (let i in todoTasks.tasks){
    //     if (!todoTasks.tasks[i].isCompleted && !includeCompleted){
    //         Tasks.push(<ListElement index={i} todoTasks={todoTasks} updateList={handleList} key={i} />)
    //     } else if (includeCompleted) {
    //         Tasks.push(<ListElement index={i} todoTasks={todoTasks} updateList={handleList} key={i} />)
    //     }
    // }

    useEffect(() => {

    }, [includeCompleted])

    const todoItems = todoTasks.tasks.map((todo) => 
        {if (!todo.isCompleted && !includeCompleted){
            return(
                <ListElement index={todo.id} todoTasks={todoTasks} key={todo.id + 1} />
            )
        } else if (includeCompleted) {
            return(
                <ListElement index={todo.id} todoTasks={todoTasks} key={todo.id + 1} />
            )
        }}
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        todoTasks.tasks.push({"name": Name, "description": Description, "isCompleted": false, "id": todoTasks.tasks.length});
        setName("")
        setDescription("")
        console.log(todoTasks)
    }

    return(
        <div className="todolist">
            {todoItems}
            <div className="maketask">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Navn" value={Name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="Beskrivelse" value={Description} onChange={e => setDescription(e.target.value)} />
                    <input type="submit" />
                </form>
            </div>
            <input type="checkbox" onClick={e => setIncludeCompleted(e.target.checked)} />
        </div>
    )
}
export default List;