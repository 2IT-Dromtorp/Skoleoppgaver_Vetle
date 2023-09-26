import { useEffect, useState } from "react";
import { todoTasks } from "./App";
import ListElement from "./ListElement";

let Tasks = [];

const List = () => {
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [shouldUpdateList, setShouldUpdateList] = useState(true);
    const [includeCompleted, setIncludeCompleted] = useState();

    const handleList = () => {
        setShouldUpdateList(true);
    }

    if (shouldUpdateList){
        Tasks = [];
        for (let i in todoTasks.tasks){
            if (!todoTasks.tasks[i].isCompleted && !includeCompleted){
                Tasks.push(<ListElement index={i} updateList={handleList} key={i} />)
            } else if (includeCompleted) {
                Tasks.push(<ListElement index={i} updateList={handleList} key={i} />)
            }
        }
        setShouldUpdateList(false);
    }

    useEffect(() => {
        handleList();
    }, [includeCompleted])

    const handleSubmit = (event) => {
        event.preventDefault();
        todoTasks.tasks.push({"name": Name, "description": Description, "isCompleted": false});
        setName("")
        setDescription("")
        setShouldUpdateList(true);
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
            <input type="checkbox" onClick={e => setIncludeCompleted(e.target.checked)} />
        </div>
    )
}
export default List;