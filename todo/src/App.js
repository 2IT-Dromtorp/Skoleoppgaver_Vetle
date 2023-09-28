import { useState, useEffect } from 'react';
import './App.css';
import List from './List';

function App() {

  const [todoTasks, setTodoTasks] = useState([])

  useEffect(() => {
    fetch("/api/todo", {method: 'GET'})
      .then((res) => res.json())
      .then((data) => setTodoTasks(data))
  }, []);

  useEffect(() => {
    const response = await;
    fetch("/api/todo", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoTasks),
      })

      response.json().then(data => {
        console.log(JSON.stringify(data));
      });
  }, [todoTasks])

  return (
    <div className="App">
      <header className="App-header">
        <List todoTasks={todoTasks} setTodoTasks={setTodoTasks}/>
      </header>
    </div>
  );
}

export default App;
