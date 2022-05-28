import './styles/Login.css'
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const api = axios.create({
        baseURL: "http://187.94.218.212:6868",
        //baseURL: "http://localhost:3001"
      });
    
    function register(item){
        api.post("/register",{
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            name: document.getElementById('name').value,
            department: document.getElementById('department').value,
        }).then((response) => {
            console.log(response.data)
        })
    }

    
  return (
    <div className="AppCreate">
        <form className='register'  >
        <span>nome</span>
            <input type="text" id="name" />
            <span>email</span>
            <input type="text" id="email" />
            <select id='department'>
                <option>selecione o nivel de usuário</option>
                <option value="1">administrador</option>
                <option value="2">colaborador</option>
            </select>
            <span>Senha</span>
            <input type="password" id="password" />
            <button onClick={register} type="button">Entrar</button>
        </form>
    </div>
  );
}

export default Login;
