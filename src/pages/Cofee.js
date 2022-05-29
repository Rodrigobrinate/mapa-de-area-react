import React from "react";
import { useState, useEffect } from "react";
import api from "../components/api";
import Header from "../components/Header";
import './styles/Cofee.css'




export default function Cofee() {
    const [msg , setMsg] = useState('')

    if (localStorage.getItem('token') === null) {
        window.location.href = '/login'

    }
    
    console.log('teste')
    useEffect (() => {
    api.get("/coffee").then(response => {
        console.log(response.data);
    });



    }, []);

  function  addCofee(){
    const headers = {
        headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    api.get("/addCoffee",headers).then((response) => {
        if(response.date.auth === false){
            window.location.href = '/login'
        }else if (response.data.status === 'error'){
            setMsg(response.data.msg)
        }else if (response.data.status === 'success'){
            setMsg('Cadastrado com sucesso')
        }
    })
}
  
  return (
    <div>
        <Header />
      <button onClick={addCofee} className="btn btn-primary btn-rigth">ir para o café</button>

      <div className="cofee">
            <h1>colabores no café</h1>

      </div>
    </div>
  );
}