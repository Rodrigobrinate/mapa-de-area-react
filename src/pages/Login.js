import './styles/Login.css'
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from "../components/api";
import { Form, Button } from 'react-bootstrap';
import Header from '../components/Header';

function Login() {
    
    
    function login(item){
        api.post("/login",{
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }).then((response) => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('name', response.data.name)
            localStorage.setItem('id', response.data.id)
            localStorage.setItem('department', response.data.department)
           
            return window.location.href = '/cofee'
        })
    }

    
  return (
    <div className="AppCreate">
        
<Header />


        <Form >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email </Form.Label>
    <Form.Control type="email" id='email' placeholder="Enter email" />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>senha</Form.Label>
    <Form.Control type="password" id='password' placeholder="Password" />
  </Form.Group>
  
  <Button onClick={login} variant="primary" type="button">
    Entrar
  </Button>
</Form>

    </div>
  );
}

export default Login;
