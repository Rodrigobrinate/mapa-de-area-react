import React from "react";
import { useState, useEffect, useRef } from "react";
import api from "./components/api";
import Header from "./components/Header";
import './pages/styles/Cofee.css'
import {Button, ListGroup, Modal, ProgressBar, Alert} from 'react-bootstrap';




export default function Cofee() {
    const [msg , setMsg] = useState('')
    const [userCoffee1, setUserCoffee1] = useState([])
    const [userCoffee2, setUserCoffee2] = useState([])
    const [userCoffee3, setUserCoffee3] = useState([])
    const [userCoffee4, setUserCoffee4] = useState([])
    const [userCoffee5, setUserCoffee5] = useState([])
    const [userCoffee6, setUserCoffee6] = useState([])


          
        
    useEffect (() => {
 
      setInterval(() => {

 api.get("/coffee/").then(response => {
  response.data.map(item => {

          console.log(item.user.user_in_work[0].time)

          const now = (((new Date().getTime() - new Date(item.created_at).getTime()) * 100)/600000).toFixed(0)
          switch (item.user.user_in_work[0].time) {
            case 1:
              
              setUserCoffee1(   
                  <ListGroup.Item className="w-full" key={item.id}>{item.user.name}
                  <ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>)
            break;
                   case 1:
                    
                    setUserCoffee1(   
                        <ListGroup.Item className="w-full" key={item.id}>{item.user.name}
                        <ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>)
                         break;
              case 2:
                
                setUserCoffee2(   
                  <ListGroup.Item className="w-full" key={item.id}>{item.user.name}
                  <ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>)
              break;       
              case 3:              
                setUserCoffee3(...userCoffee3,   
                  <ListGroup.Item className="w-full" key={item.id}>{item.user.name}
                  <ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>)
              break;
              case 4:                 
                setUserCoffee4(   
                  <ListGroup.Item className="w-full" key={item.id}>{item.user.name}
                  <ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>)
              break;
              case 5:                  
                setUserCoffee5(   
                  <ListGroup.Item className="w-full" key={item.id}>{item.user.name}
                  <ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>)
              break;
              }
  })  
 
        }).catch((error) => {
            console.log(error)
            if(error.response.status ==  401){
                window.location.href = '/login'
            }
        })
        

      }, 1000);


    }, []);
 
  return (
    <div>
        <Header />
        {msg}
      <div className="cofee w-full">
            <h1>colabores no café</h1>
            <ListGroup className="d-flex border flex-row text-sm mt-3">
                pausa 07:00
                {userCoffee1}
            </ListGroup>
            <ListGroup className="d-flex border flex-row text-sm mt-3">
                pausa 07:30
                {userCoffee2}
            </ListGroup>
            <ListGroup className="d-flex border flex-row text-sm mt-3">
                pausa 08:00
                {userCoffee3}
            </ListGroup>
            <ListGroup className="d-flex border flex-row text-sm mt-3">
                pausa 12:00
                {userCoffee4}
            </ListGroup>
            <ListGroup className="d-flex border flex-row text-sm mt-3">
                pausa 14:30
                {userCoffee5}
            </ListGroup>
            <ListGroup className="d-flex border flex-row text-sm mt-3">
                pausa 16:30
                {userCoffee6}
            </ListGroup>
      </div>
    </div>
  );
}