import logo from './logo.svg';
import './App.css';

function App() {
  async function get(){
    const res = await fetch("/api/get")
    const data = await res.text()
    console.log (data)
  }
  return (
    <div className="App">
      <p>lorem impsum</p>
      <button onClick={get}>Hent</button>
    </div>
  );
}

export default App;
