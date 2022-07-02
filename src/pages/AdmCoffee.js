import React from "react";
import { useState, useEffect, useRef } from "react";
import api from "../components/api";
import Header from "../components/Header";
import './styles/Cofee.css'
import {Button, ListGroup, Modal, ProgressBar, Alert} from 'react-bootstrap';




export default function AdmCoffee() {
    const [msg , setMsg] = useState('')
    const [userCoffee, setUserCoffee] = useState([])

    useEffect (() => {
        api.get("/coffee").then(response => {
          
            setUserCoffee(response.data.map((item) => {
              const now = (((new Date().getTime() - new Date(item.created_at).getTime()) * 100)/600000).toFixed(0)
            return (
                <ListGroup.Item key={item.id}>
                  {item.user.name}<ProgressBar style={{width: '96%'}} now={now} label={`${now}%`} />
                  <img onClick={() => deleteCoffee(item.user.id)} style={{float: 'right', marginTop: '-20px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ9JREFUSEvt1csRwjAMRdGTSigB6IQSSAeUQCdQAp0AHZBKYFjwCzFyMgmbREuP5l3p2ZYKA0cxsL4cwBq7RCEl9r+KjAALHIMulzilcuqAa0+WPXX/DuipgZdM6g66WvWlNw7Ao8u6bU3nnSyaAI1P/93vyaIRWNRmAGZ/tAtmbZRxxn1BfURq2K2wxTwTUmGDQy4gUzdOi3ZyrBBk3AB+wyoZJl1mqQAAAABJRU5ErkJggg=="/>
                  
                  </ListGroup.Item>
            )
           }))
        }).catch((error) => {
            console.log(error)
            if(error.response.status ==  401){
                window.location.href = '/login'
            }
        })
    }, []);

    function deleteCoffee(id){
      const headers = {
        headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    api.post("/admCloseCofee",{
      id: id
    },headers).then((response) => {
        
        api.get("/coffee", headers).then(response => {
    
            setUserCoffee(response.data.map((item) => {
                const now = (((new Date().getTime() - new Date(item.created_at).getTime()) * 100)/600000).toFixed(0)
                if (item.user.id == localStorage.getItem('id')) {
                   
    
                
            
            return (
              <ListGroup.Item key={item.id}>
              {item.user.name}<ProgressBar style={{width: '96%'}} now={now} label={`${now}%`} />
              <img onClick={() => deleteCoffee(item.user.id)} style={{float: 'right', marginTop: '-20px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ9JREFUSEvt1csRwjAMRdGTSigB6IQSSAeUQCdQAp0AHZBKYFjwCzFyMgmbREuP5l3p2ZYKA0cxsL4cwBq7RCEl9r+KjAALHIMulzilcuqAa0+WPXX/DuipgZdM6g66WvWlNw7Ao8u6bU3nnSyaAI1P/93vyaIRWNRmAGZ/tAtmbZRxxn1BfURq2K2wxTwTUmGDQy4gUzdOi3ZyrBBk3AB+wyoZJl1mqQAAAABJRU5ErkJggg=="/>
              
              </ListGroup.Item>
            )
            
            }else{
    
                return (
                    <ListGroup.Item key={item.id}>{item.user.name}<ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>
                )
            
            }}))
        })
        
    }).catch((error) => {
        console.log(error)
        if(error.response.status ==  401){
            window.location.href = '/login'
        }
    })
        
    }
 
  return (
    <div>
        <Header />
        {msg}
      <div className="cofee">
            <h1>colabores no café</h1>
            <ListGroup>
                {userCoffee}
            </ListGroup>
      </div>
    </div>
  );
}