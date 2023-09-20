import { useEffect, useState } from "react";
import { todoTasks } from "./App";
import ListElement from "./ListElement";

const List = () => {
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");

    let Tasks = [];
    for (let i in todoTasks.tasks){
        if (!todoTasks.tasks[i].isCompleted){
            Tasks.push(<ListElement name={todoTasks.tasks[i].name} description={todoTasks.tasks[i].description} isCompleted={todoTasks.tasks[i].isCompleted} index={i} key={i} />)
        }
    }

    console.log(Tasks)

    const handleSubmit = (event) => {
        event.preventDefault();
        todoTasks.tasks.push({"name": Name, "description": Description, "isCompleted": false});
        setName("")
        setDescription("")
        console.log(todoTasks);
    }

    return(
        <div className="todolist">
            {Tasks}
            <div className="maketask">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Navn" value={Name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="Beskrivelse" value={Description} onChange={e => setDescription(e.target.value)} />
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}
export default List;