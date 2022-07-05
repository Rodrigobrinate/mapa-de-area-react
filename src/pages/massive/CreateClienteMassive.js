import '../styles/Create.css'
import React from 'react';
import { useState, useEffect } from 'react';
//import Alerts from '../../components/Alert';

import { Link} from 'react-router-dom';
import Header from '../../components/Header';
import api from "../../components/api";
import { Form,Button, Alert } from 'react-bootstrap';

function CreateClienteMassive() {
    const [colaborator, setColaborator] = useState([])
    const [massiva, setMassiva] = useState([])
    const [msg, setMsg] = useState([])

   



if (localStorage.getItem('token') === null) {
    window.location.href = '/login'
    }

    const headers = {
        headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }

    useEffect(() => { 

        api.get("/Massive", headers).then((response) => setMassiva(response.data))
    }, []);

    function create(item){
        api.post("/createMassiveClient",{
            
            massive_id: document.getElementById('massive').value,
            name: document.getElementById('name').value,
            problem: document.getElementById('problem').value,
        },headers).then((response) => {
           response.data.st == 1 ?
            setMsg(<Alert  variant="success" >{response.data.msg}</Alert>) :
             setMsg(<Alert  variant="danger" >{response.data.msg}</Alert>)
             if (response.data.st == 0){
                return 
            }else if (response.data.status == 1){ 
                
            return window.location.reload()
            }
        }).catch((error) => {
            console.log(error)
            if(error.response.status ==  401){
                window.location.href = '/login'
            }
        })
    }
  return (
    <div className="AppCreate">
        <Header />
    
      {msg}
   
        
     <form >

         <span>Massiva</span>
         <Form.Select id="massive">
            <option value={0}>selecione a massiva</option>
            {massiva.map((item)=> <option key={item.id} value={item.id}>{item.id+"  "}{item.city.name}</option>)}
            
         </Form.Select  >
         <span>Nome</span>
         <Form.Control type="text" id="name" placeholder="digite o nome do cliente" />
            <span>Problema</span>
         <Form.Select id="problem">
            <option value={0}>selecione o problema</option>
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
