import './styles/Create.css'
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import Header from '../components/Header';
import api from "../components/api";
import { Button, Form } from 'react-bootstrap';


function Create() {
    const [colaborator, setColaborator] = useState([])
    const [city, setCity] = useState([])
    const [msg, setMsg] = useState('')
    
console.log('teste')



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
        const headers = {
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
            }
        }


        api.post("/create",{
            colaborator: document.getElementById('colaborator').value,
            city: document.getElementById('city').value,
            period: document.getElementById('period').value,
            date: document.getElementById('date').value,
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
     
     <form >
         <span>cidade</span>
         <Form.Select id="city">
            <option>selecione a cidade</option>
            {city.map((item)=> <option value={item.id}>{item.name}</option>)}
            
         </Form.Select  >
         <span>Técnico</span>
         <Form.Select id="colaborator">
            <option>selecione o tecnioc</option>
            {colaborator.map((item)=> <option value={item.id}>{item.name}</option>)}
         </Form.Select>
         <span>período</span>
         <Form.Select id='period'>
            <option>selecione o período</option>
            <option value={"08:00 as 18:00"}>dia</option>
            <option value={"13:00 as 21:00"}>noite</option>
         </Form.Select>
         <span>tipo de serviço</span>
         <Form.Select id='type'>
            <option>selecione o tipo de serviço</option>
            <option value={"Instalação"}>Instalação</option>
            <option value={"manutenção"}>manutanção</option>
         </Form.Select>
            <span>data</span>
            <Form.Control id='date' type="date" />
            <Button type='button' onClick={create} className="submit" >cadastrar</Button>
         
     </form>
    </div>
  );
}

export default Create;
