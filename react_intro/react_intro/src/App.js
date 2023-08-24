import logo from './logo.svg';
import './App.css';
import MyButtonImport from './MyButton';
import ProfileImport from './Profile';
import { useState } from "react";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let content;

  if (isLoggedIn){
    content = <ProfileImport />;
  } else {
    content = <MyButtonImport />
  }

  function isLoggedInChange(boolean) {
    setIsLoggedIn(boolean);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React intro</h1>
        <input type="checkbox" onClick={() => isLoggedInChange(!isLoggedIn)}/>

        {content}

      </header>
    </div>
  );

}

function MyButton() {
  const [count, setCount] = useState(0);
    
  function incrementNumber(){
      setCount(count + 1);
  }

  return(
      <button onClick={incrementNumber}>{count}</button>
  )
}

export default App;
