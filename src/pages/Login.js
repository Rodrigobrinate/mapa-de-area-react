import './styles/Login.css'
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from "../components/api";

function Login() {
    
    
    function login(item){
        api.post("/login",{
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }).then((response) => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('name', response.data.name)
           
            return window.location.href = '/create'
        })
    }

    
  return (
    <div className="AppCreate">
        <form className='login'  >
            <span>email</span>
            <input type="text" id="email" />
            <span>Senha</span>
            <input type="password" id="password" />
            <button onClick={login} className="submit" type="button">Entrar</button>
        </form>
    </div>
  );
}

export default Login;
