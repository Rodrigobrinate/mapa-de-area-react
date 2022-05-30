import './styles/Login.css'
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import api from '../components/api';
import {Form} from 'react-bootstrap';

function Login() {
   
    
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
        <Header />
        <form className='register'  >
        <span>nome</span>
            <Form.Control type="text" id="name" />
            <span>email</span>
            <Form.Control type="text" id="email" />
            <span>selecione o nivel de permissão do usuário</span>
            <Form.Select id='department'>
                <option>selecione setor</option>
                <option value="1">Call center</option>
                <option value="2">Tecnioco</option>
                <option value="3">Backoffice</option>
                <option value="4">CGR</option>
            </Form.Select>
            <span>Senha</span>
            <Form.Control type="password" id="password" />
            <button onClick={register} className="submit" type="button">Entrar</button>
        </form>
    </div>
  );
}

export default Login;
