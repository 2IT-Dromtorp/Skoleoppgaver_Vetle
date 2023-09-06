import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import List from './List';
import Weather from './Weather.js';
import LogIn from './Login.js';

export default function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>React intro</h1>
        <LogIn />
      </header>
    </div>
  );
}