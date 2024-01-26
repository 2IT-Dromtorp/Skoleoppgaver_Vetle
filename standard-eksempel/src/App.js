import './App.css';

function App() {
  function absolute() {
    fetch("http://localhost:8080/api/get").then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data.message)
    })
  }
  function relative() {
    fetch("/api/get").then(async (res) => {
      return res.json()
    }).then((data) => {
      console.log(data.message)
    })
  }

  return (
    <div className="App">
      <button onClick={() => absolute()}>Fetch data absolutt</button>
      <button onClick={() => relative()}>Fetch data relativ</button>
    </div>
  );
}

export default App;
