
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Card, ListGroup } from 'react-bootstrap';
import './styles/Massive.css'
import Header from '../components/Header';
import api from "../components/api";
import { DocumentRemoveIcon } from '@heroicons/react/solid';

function Massive() {
  const [massive, setMassive] = useState([])
  const headers = {
    headers: {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token')
    }
}
   
  useEffect(() => {

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
            
                ))

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
      

      <ListGroup className='item'>
     {massive}
     </ListGroup>
    </div>
  );
}

export default Massive;
