
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Card } from 'react-bootstrap';
import './styles/Massive.css'
import Header from '../components/Header';
import api from "../components/api";

function Massive() {
  const [massive, setMassive] = useState([])
   
  useEffect(() => {
    api.get("/massive").then((response) => 
      

        setMassive(
      
            response.data.map((item) => {    
                return (
                    
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{item.id+"    "}{item.type}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{item.city.name}</Card.Subtitle>
                      <Card.Text>
                        {item.description}
                      </Card.Text>
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
      

      <ul>
     {massive}
     </ul>
    </div>
  );
}

export default Massive;
