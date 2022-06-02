import React from "react";
import { useState, useEffect, useRef } from "react";
import api from "./components/api";
import Header from "./components/Header";
import './pages/styles/Cofee.css'
import {Button, ListGroup, Modal, ProgressBar, Alert} from 'react-bootstrap';




export default function Cofee() {
    const [msg , setMsg] = useState('')
    const [userCoffee, setUserCoffee] = useState([])

    useEffect (() => {
        api.get("/coffee").then(response => {
          
            setUserCoffee(response.data.map((item) => {
              const now = (((new Date().getTime() - new Date(item.created_at).getTime()) * 100)/600000).toFixed(0)
            return (
                <ListGroup.Item key={item.id}>{item.user.name}<ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>
            )
           }))
        }).catch((error) => {
            console.log(error)
            if(error.response.status ==  401){
                window.location.href = '/login'
            }
        })
    }, []);
 
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