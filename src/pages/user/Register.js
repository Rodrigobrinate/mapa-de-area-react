//import './styles/Login.css'
import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import api from '../../components/api';
import {Form, Alert} from 'react-bootstrap';

function Register() {
   const [msg, setMsg] = useState('')

useEffect(() => {

   let name = document.getElementById('name');
  let email = document.getElementById('email')
  let password = document.getElementById('password')
   name.addEventListener('keyup', function(e) { 
     console.log(e);
   
       if (e.key === 'Enter') {
           e.preventDefault();
           document.getElementById('email').focus();
       } else {
           document.getElementById('name').focus();
       }  
     }) 

     email.addEventListener('keyup', function(e) { 
      
      
          if (e.key === 'Enter') {
              e.preventDefault();
              document.getElementById('department').focus();
          } else {
              document.getElementById('email').focus();
          }  
        }) 
         
          
            password.addEventListener('keyup', function(e) { 
              console.log(e);
            
                if (e.key === 'Enter') {
                    e.preventDefault();
                    register();
                } else {
                    document.getElementById('password').focus();
                }  
              }) 

    }, []);

    
    function register(e){
      e.preventDefault()
        api.post("/register",{
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            name: document.getElementById('name').value,
        }).then((response) => {
            response.data.st === 1 ?
            window.location.href = '/login' :
             setMsg(<Alert  variant="sucess" >{response.data.msg}</Alert>)
        }).catch((err) => {
          console.log(err)
          setMsg(<Alert  variant="danger" >{err.response.data.msg}</Alert>)
        })
        
    }

    
  return (
    <div className="AppCreate">
        <Header />
        {msg}
        <form className='register'  onSubmit={(e) => {register(e)}}>
        <span>nome</span>
            <Form.Control type="text" required id="name" />
            <span>email</span>
            <Form.Control type="email" required id="email" />
            <span>Senha</span>
            <Form.Control required type="password" id="password" />
            <button  className="submit" type="submit">Entrar</button>
            <a href="/login" >Já possuo uma conta</a>
        </form>
    </div>
  );
}

export default Register;
