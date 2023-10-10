import { useState, useEffect } from 'react';
import './App.css';
import List from './List';

function TodoList() {

  const [todoTasks, setTodoTasks] = useState([])
  const [hasDoneInitalRender, setHasDoneInitialRender] = useState(false)

  useEffect(() => {
    fetch("/api/todo", {method: 'GET'})
      .then((res) => res.json())
      .then((data) => {setTodoTasks(data);setHasDoneInitialRender(true)})
      .catch((error) => console.error("Error fetching data:", error))
  }, []);

  useEffect(() => {
    console.log("Use effect has been called with todoTasks", todoTasks)
    if (hasDoneInitalRender) {
      console.log("Continuing to fetch data")
      fetch("/api/todo", {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(todoTasks),
        })
        .then((res) => {
          if (!res.ok){
            throw new Error(`Request failed with status ${res.status}`)
          }
        })
        .catch((error) => console.error("Error sending data:", error))
    }
  }, [todoTasks])

  return (
    <div className="App">
      <header className="App-header">
        <List todoTasks={todoTasks} setTodoTasks={setTodoTasks}/>
      </header>
    </div>
  );
}

export default TodoList;
