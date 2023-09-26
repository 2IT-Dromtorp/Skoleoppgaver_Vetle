import { useState } from 'react';
import './App.css';
import List from './List';
import data from './todo.json';

function App() {

  const [todoTasks, setTodoTasks] = useState(data)

  return (
    <div className="App">
      <header className="App-header">
        <List todoTasks={todoTasks}/>
      </header>
    </div>
  );
}

export default App;
