
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Card, ListGroup, Modal, Button } from 'react-bootstrap';
import '../styles/Massive.css'
import Header from '../../components/Header';
import api from "../../components/api";
import { DocumentRemoveIcon } from '@heroicons/react/solid';

function Massive() {
  const [massive, setMassive] = useState([])
  const [show, setShow] = useState(false);
  const [olt, setOlt] = useState([])
  const [cto, setCto] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const headers = {
    headers: {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token')
    }
}
   
  useEffect(() => {
    console.log(process.env)

    var config = {
      method: 'get',
      url: 'https://synsuite.acesse.net.br:45701/api/v1/isp/olt/integration/all',
      headers: { 
        'Authorization':  process.env.REACT_APP_VOALLE_BARER 
         }
    };

    var configCto = {
      method: 'get',
      url: 'https://synsuite.acesse.net.br:45701/api/v1/isp/networkboxes/integration/all',
      headers: { 
        'Authorization': process.env.REACT_APP_VOALLE_BARER  
      }
    };

    axios(config)
    .then(
     function (response) {
      setOlt(response.data.response)
      console.log(response.data)
    })

    axios(configCto)
    .then(
     function (response) {
      setCto(response.data.response)
      console.log(response.data)
    })


    if (localStorage.getItem('token') === null) {
      window.location.href = '/login'
  }

  const option = {
    year: 'numeric',
    month: ( 'numeric'),
    weekday: ('short'),
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}
const locale = 'pt-br'

    api.get("/massive", headers).then((response) => 
      

        setMassive(
            response.data.map((item) => {    
              
                return (
                    
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{item.id+"    "}{item.type}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{item.city.name}</Card.Subtitle>
                    <Card.Text dangerouslySetInnerHTML={{ __html: item.description }} >
                        
                      </Card.Text>
                      <span className='date'>
                      <p>{new Date(item.date).toLocaleDateString(locale, option)}</p>
                      <p>{new Date(item.returndate).toLocaleDateString(locale, option)}</p></span>
                    </Card.Body>
                  </Card>
                )}
            
            
                )
            
                )).catch((err) => {
                  if (err.response.status == 401){
                    window.location.href = "/login"
                  }
                })

  }, []);




  function deleteColeborator(id){

    api.post("/delete ",{
      id: id,
      
      
    } ).then((response) => {console.log(response.data)})
    
  }
  function search(item){
    
    api.post("/Massive",{
      date: document.getElementById('date').value,
      
      
    }  ).then((response) => setMassive(
      
response.map((item) => {    
    return (
        
        <div>
            <h1>{item.type}</h1>
        </div>
    
    )}


    )

    ))
  }


  return (
     
    <div className="Massive"> <Header />
  
      
      <button className='btn btn-primary f-right' style={{
    float: 'right',
    marginRight: '40px',
    marginTop: '10px',
    marginBottom: '10px'}} 
    onClick={handleShow}
    
    >adicionar massiva +</button>

<Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        
        <span>selecione a Olt</span>
       <select>
       
        {olt.map((item) => {
          return(
             <option value={item.id}>{item.title}</option>
          )
        })}
       
       </select>
       

       <span>selecione cto</span>
       <select>
        {cto.map((item) => {
          return(
             <option value={item.id}>{item.title}</option>
          )
        })}
       
       </select>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>


      <ListGroup className='item'>
     {massive}
     </ListGroup>
    </div>
  );
}

export default Massive;
