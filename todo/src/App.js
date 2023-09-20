import './App.css';
import List from './List';
import data from './todo.json';

export let todoTasks = data;
console.log(todoTasks)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <List />
      </header>
    </div>
  );
}

export default App;
