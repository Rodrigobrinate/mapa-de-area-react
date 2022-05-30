import './styles/Create.css'
import React from 'react';
import { useState, useEffect } from 'react';

import { Link} from 'react-router-dom';
import Header from '../components/Header';
import api from "../components/api";
import { Form,Button } from 'react-bootstrap';

function CreateClienteMassive() {
    const [colaborator, setColaborator] = useState([])
    const [massiva, setMassiva] = useState([])
    const [msg, setMsg] = useState('')
   



if (localStorage.getItem('token') === null) {
    window.location.href = '/login'
    }


    useEffect(() => { 
        api.get("/Massive").then((response) => setMassiva(response.data))
    }, []);

    function create(item){
        console.log('teste')
        const headers = {
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
            }
        }


        api.post("/createMassiveClient",{
            
            massive_id: document.getElementById('massive').value,
            name: document.getElementById('name').value,
            problem: document.getElementById('problem').value,
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
         <span>Massiva</span>
         <Form.Select id="massive">
            <option>selecione a massiva</option>
            {massiva.map((item)=> <option value={item.id}>{item.id+"  "}{item.city.name}</option>)}
            
         </Form.Select  >
         <span>Nome</span>
         <Form.Control type="text" id="name" placeholder="digite o nome do cliente" />
            <span>Problema</span>
         <Form.Select id="problem">
            <option>selecione o problema</option>
             <option value='sem acesso'>sem acesso</option>
             <option value='sem acesso'>conexão lenta</option>
             
            
         </Form.Select>
       
            <Button 
            variant={"success"} 
            type='Button' 
            onClick={create} 
            className="submit">cadastrar</Button>
         
     </form>
    </div>
  );
}

export default CreateClienteMassive;
