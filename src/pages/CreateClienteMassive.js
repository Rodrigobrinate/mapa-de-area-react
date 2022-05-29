import './styles/Create.css'
import React from 'react';
import { useState, useEffect } from 'react';

import { Link} from 'react-router-dom';
import Header from '../components/Header';
import api from "../components/api";

function CreateClienteMassive() {
    const [colaborator, setColaborator] = useState([])
    const [city, setCity] = useState([])
    const [msg, setMsg] = useState('')
   



if (localStorage.getItem('token') === null) {
    window.location.href = '/login'
    }

    useEffect(() => { 
        api.get("/colaborator")
        .then((response) => setColaborator(response.data))
    }, []);


    useEffect(() => { 
        api.get("/city").then((response) => setCity(response.data))
    }, []);

    function create(item){
        console.log('teste')
        const headers = {
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
            }
        }


        api.post("/createMassiveCliet",{
            
            city: document.getElementById('city').value,
            returndate: document.getElementById('return_date').value,
            date: document.getElementById('init_date').value,
            type: document.getElementById('type').value,
        },headers).then((response) => {
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
    <div className="AppCreate">
        <Header />
        <Link className='btn btn-add' to="/"> visualizar</Link>
     <form >
         <span>Massiva</span>
         <select id="city">
            <option>selecione a massiva</option>
            {city.map((item)=> <option value={item.id}>{item.name}</option>)}
            
         </select  >
         <span>Nome</span>
         <input type="text" id="name" placeholder="digite o nome do cliente" />
         <span>Problema</span>
         <input type="text" id="name" placeholder="digite o problema do cliente" />
         
            
            <button type='button' onClick={create} className="submit" >cadastrar</button>
         
     </form>
    </div>
  );
}

export default CreateClienteMassive;
