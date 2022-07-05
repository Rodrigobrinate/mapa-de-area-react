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
  let department = document.getElementById('department')
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
        console.log(e);
      
          if (e.key === 'Enter') {
              e.preventDefault();
              document.getElementById('department').focus();
          } else {
              document.getElementById('email').focus();
          }  
        }) 
        department.addEventListener('keyup', function(e) { 
            console.log(e);
          
              if (e.key === 'Enter') {
                  e.preventDefault();
                  document.getElementById('password').focus();
              } else {
                  document.getElementById('department').focus();
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

    
    function register(item){
        api.post("/register",{
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            name: document.getElementById('name').value,
            department: document.getElementById('department').value,
        }).then((response) => {
            response.data.st === 1 ?
            window.location.href = '/login' :
             setMsg(<Alert  variant="danger" >{response.data.msg}</Alert>)}
        )
    }

    
  return (
    <div className="AppCreate">
        <Header />
        {msg}
        <form className='register'  >
        <span>nome</span>
            <Form.Control type="text" required id="name" />
            <span>email</span>
            <Form.Control type="text" required id="email" />
            <span>selecione o nivel de permissão do usuário</span>
            <Form.Select required id='department'>
                <option value={0}>selecione setor</option>
                <option value="1">Call center</option>
                <option value="2">Técnico</option>
            </Form.Select>
            <span>Senha</span>
            <Form.Control required type="password" id="password" />
            <button onClick={register} className="submit" type="button">Entrar</button>
            <a href="/login center" >Já possuo uma conta</a>
        </form>
    </div>
  );
}

export default Register;
