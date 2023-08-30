import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import ListImport from './List';
import WeatherImport from './Weather.js';
import LogInImport from './Login.js';

export default function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>React intro</h1>
        <LogInImport />
      </header>
    </div>
  );
}