import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import MyButtonImport from './MyButton';
import ProfileImport from './Profile';
import ListImport from './List';

export default function App() {

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

        <ListImport />

        {content}

      </header>
    </div>
  );
}