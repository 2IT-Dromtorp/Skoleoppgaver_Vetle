import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './pages/App.js';
import Classlist from './pages/Classlist.js';
import Profile from './pages/Profile.js';
import Classmap from './pages/Classmap.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/classlist" element={<Classlist />} />
            <Route path="/profile/:elevIndex" element={<Profile />} />
            <Route path="/classmap" element={<Classmap />} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
