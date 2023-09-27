import { useState, useEffect } from 'react';
import './App.css';
import List from './List';
import data from './todo.json';

function App() {

  const [todoTasks, setTodoTasks] = useState([])

  useEffect(() => {
    setTodoTasks(data);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <List todoTasks={todoTasks} setTodoTasks={setTodoTasks}/>
      </header>
    </div>
  );
}

export default App;
