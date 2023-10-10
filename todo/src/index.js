import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from './TodoList';
import Login from './login';
import Register from './register';
import User from './user';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users/:user/" element={<User />} />
      <Route path="/users/:user/:list" element={<TodoList />} />
    </Routes>
  </BrowserRouter>
);