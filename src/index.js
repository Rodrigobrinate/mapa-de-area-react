import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Create from './pages/Create';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateMassive from './pages/CreateMassive';
import Massive from './pages/Massive';
import Cofee from './pages/Cofee';
import CreateClienteMassive from './pages/CreateClienteMassive';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/createMassive" element={<CreateMassive />}></Route>
      <Route path="/massive" element={<Massive />}></Route>
      <Route path="/createClienteMassive" element={<CreateClienteMassive />}></Route>
      <Route path="/cofee" element={<Cofee />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
