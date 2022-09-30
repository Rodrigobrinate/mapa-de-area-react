//import './styles/Login.css'
import React from 'react';
import { useState, useEffect } from 'react';
import api from "../../components/api";
import { Form, Button, Alert } from 'react-bootstrap';
import Header from '../../components/Header';

function Login() {
  const [msg, setMsg] = useState('');

 useEffect(() => {
let email = document.getElementById('email');
let password = document.getElementById('password');
email.addEventListener('keyup', function(e) { 
  console.log(e);
 
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('password').focus();
    } else {
        document.getElementById('email').focus();
    }  
  }) 

  password.addEventListener('keyup', function(e) { 
    console.log(e);
  
      if (e.key === 'Enter') {
          e.preventDefault();
          login();
      } else {
          document.getElementById('password').focus();
      }  
    }) 



  }, []);
    
    function login(e){
      e.preventDefault()
        api.post("/login",{
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }).then((response) => {
          

            localStorage.setItem('token', response.data.response.token)
            localStorage.setItem('name', response.data.response.name)
            localStorage.setItem('email', response.data.response.email)
            localStorage.setItem('id', response.data.response.id)
            localStorage.setItem('department', response.data.response.department.id)
            return window.location.href = '/Mapa/area'
            
        }).catch((err)=> {
          setMsg(<Alert  variant="danger" >{err.response.data.msg}</Alert>)
          
        })
    }

    
  return (
    <div className="AppCreate">
        
<Header />
    {msg}

        <Form onSubmit={(e)=> {login(e)}} >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email </Form.Label>
    <Form.Control type="email" id="email" required placeholder="Enter email" />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>senha</Form.Label>
    <Form.Control type="password" required id='password' placeholder="Password" />
  </Form.Group>
  
  <Button  variant="primary" type="submit">
    Entrar
  </Button>
 
  <a  style={{float: 'right'}} href='/register'>Cadastrar</a>
</Form>

    </div>
  );
}

export default Login;
