import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import TodoList from './TodoList';
import Login from './Login';
import Register from './Register';
import User from './User';
import HomePage from './HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:user" element={<User />} />
      <Route path="/:user/:list" element={<TodoList />} />
    </Routes>
  </BrowserRouter>
);