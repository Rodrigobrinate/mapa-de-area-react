import './styles/Login.css'
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const api = axios.create({
        baseURL: "http://187.94.218.212:6868",
        //baseURL: "http://localhost:3001"
      });
    
    function login(item){
        api.post("/login",{
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }).then((response) => {
            localStorage.setItem('token', response.data.token)
           
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
            <button onClick={login} type="button">Entrar</button>
        </form>
    </div>
  );
}

export default Login;
