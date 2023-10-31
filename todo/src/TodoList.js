import { useState, useEffect } from 'react';
import './App.css';
import List from './List';
import { useParams } from 'react-router-dom';

function TodoList() {

  const [todoTasks, setTodoTasks] = useState([])
  const [hasDoneInitalRender, setHasDoneInitialRender] = useState(false)

  const params = useParams()

  useEffect(() => {
    fetch("/api/todo/get", {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: params.list
      })
      .then((res) => res.json())
      .then((data) => {setTodoTasks(data);setHasDoneInitialRender(true)})
      .catch((error) => console.error("Error fetching data:", error))
  }, []);

  useEffect(() => {
    if (hasDoneInitalRender) {
      console.log("Continuing to fetch data")
      fetch("/api/todo/post", {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: {"tasks": JSON.stringify(todoTasks), "listToEdit": params.list},
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
