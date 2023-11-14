import { useState, useEffect } from 'react';
import './App.css';
import List from './List';
import { useParams } from 'react-router-dom';

function TodoList() {

  const [todoTasks, setTodoTasks] = useState([])
  const [hasDoneInitalRender, setHasDoneInitialRender] = useState(false)

  const params = useParams()

  useEffect(() => {
    fetch(encodeURI(`/api/todo?id=${params.id}`), {
      method: "get",
      })
      .then((res) => res.json())
      .then((data) => {setTodoTasks(data);setHasDoneInitialRender(true)})
      .catch((error) => console.error("Error fetching data:", error))
  }, [params]);

  useEffect(() => {
    if (hasDoneInitalRender) {
      fetch(encodeURI(`/api/todo?id=${params.id}`), {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"tasks": JSON.stringify(todoTasks)})
        })
        .then((res) => {
          if (!res.ok){
            throw new Error(`Request failed with status ${res.status}`)
          }
        })
        .catch((error) => console.error("Error sending data:", error))
    }
  }, [todoTasks, hasDoneInitalRender, params])

  return (
    <div className="App">
      <header className="App-header">
        <List todoTasks={todoTasks} setTodoTasks={setTodoTasks}/>
      </header>
    </div>
  );
}

export default TodoList;
