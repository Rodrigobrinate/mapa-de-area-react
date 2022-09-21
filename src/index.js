import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Create from './pages/mapa_area/Create';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import CreateMassive from './pages/massive/CreateMassive';
import Massive from './pages/massive/Massive';
import Cofee from './pages/coffee/Cofee';
import ClientMassive from './pages/massive/ClientMassive';
import CreateClienteMassive from './pages/massive/CreateClienteMassive';
import MapaArea from './pages/mapa_area/MapaArea';
import AdmCoffee from './pages/Adm/AdmCoffee';
import AdmEscalaCall from './pages/Adm/EscalaCall';
import EscalaCall from './pages/Escala/call/EscalaCall';
import AdmEscalaSuport from './pages/Adm/EscalaSupot';
import CreateEscala from './pages/Adm/CrateEscala';
import EscalaSuport from './pages/Escala/suport/EscalaSuport';
import AdmUsers from './pages/Adm/users/AdmUsers';
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
      <Route path="/create/massive" element={<CreateMassive />}></Route>
      <Route path="/massive" element={<Massive />}></Route>
      <Route path="/create/cliente/massive" element={<CreateClienteMassive />}></Route>
      <Route path="/cofee" element={<Cofee />}></Route>
      <Route path="/client/massive" element={<ClientMassive />}></Route>
      <Route path="/mapa/area" element={<MapaArea />}></Route>
      <Route path="/adm/coffee" element={<AdmCoffee />}></Route>
      <Route path="/adm/escala/call" element={<AdmEscalaCall />}></Route>
      <Route path="/escala/call" element={<EscalaCall />}></Route>
      <Route path="/adm/escala/suport" element={<AdmEscalaSuport />}></Route>
      <Route path="/adm/create/escala" element={<CreateEscala />}></Route>
      <Route path="/escala/suport" element={<EscalaSuport />}></Route>
      <Route path="/adm/users" element={<AdmUsers />}></Route>
      
     
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 