import React from "react";
import { useState, useEffect, useRef } from "react";
import api from "../components/api";
import Header from "../components/Header";
import './styles/Cofee.css'
import {Button, ListGroup, Modal, ProgressBar, Alert} from 'react-bootstrap';




export default function Cofee() {
    const [msg , setMsg] = useState('')
    const [show, setShow] = useState(false);
    const [userCoffee, setUserCoffee] = useState([])
    const Ref = useRef(null);
  const handleClose = () => {setShow(false); closeCofee()};
  const handleShow = () => setShow(true);

const [timer, setTimer] = useState(0);


 function startCoffee(date){

setInterval(() => {

console.log(date)
let time = new Date().getTime() - date ;

 let seconds = Math.floor(time / 1000) % 60;

 if (seconds < 10) {
    seconds = "0" + seconds;
        }
    let minutes = Math.floor(Math.floor((time / 1000)) / 60) % 60;
    if (minutes < 10) {   
      minutes = "0" + minutes; 
        }
    let hours = Math.floor(minutes / 60);
    if (hours < 10) {   
        hours = "0" + hours; 
          }
    return setTimer(hours+":"+minutes+":"+seconds)
}, 1000)}




    if (localStorage.getItem('token') === null) {
        window.location.href = '/login'
    }

    useEffect (() => {

        const headers = {
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
            }
        }
        api.get("/coffee", headers).then(response => {
        
            setUserCoffee(response.data.map((item) => {
                const now = (((new Date().getTime() - new Date(item.created_at).getTime()) * 100)/600000).toFixed(0)
                if (item.user.id == localStorage.getItem('id')) {
                    setShow(true)
                    startCoffee(parseInt(new Date(item.created_at).getTime()))
    
                
            
            return (
                <ListGroup.Item key={item.id}>{item.user.name}<ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>
            )
            
            }else{
    
                return (
                    <ListGroup.Item key={item.id}>{item.user.name}<ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>
                )
            
            }}))
        }).catch((error) => {
            console.log(error)
            if(error.response.status ==  401){
                window.location.href = '/login'
            }
        })
        
   



    }, []);



    function closeCofee(){
        localStorage.removeItem('coffee')

        const headers = {
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
            }
        }
        api.get("/closeCofee",headers).then((response) => {
            
            api.get("/coffee", headers).then(response => {
        
                setUserCoffee(response.data.map((item) => {
                    const now = (((new Date().getTime() - new Date(item.created_at).getTime()) * 100)/600000).toFixed(0)
                    if (item.user.id == localStorage.getItem('id')) {
                        setShow(true)
                        startCoffee(parseInt(new Date(item.created_at).getTime()))
        
                    
                
                return (
                    <ListGroup.Item key={item.id}>{item.user.name}<ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>
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
 

  function  addCofee(){
    startCoffee(parseInt(new Date().getTime()))


    const headers = {
        headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }
    api.get("/addCoffee",headers).then((response) => {
        api.get("/coffee", headers).then(response => {
        
            setUserCoffee(response.data.map((item) => {
                const now = (((new Date().getTime() - new Date(item.created_at).getTime()) * 100)/600000).toFixed(0)
                if (item.user.id == localStorage.getItem('id')) {
                    setShow(true)
                    startCoffee(parseInt(new Date(item.created_at).getTime()))
    
                
            
            return (
                <ListGroup.Item key={item.id}>{item.user.name}<ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>
            )
            
            }else{
    
                return (
                    <ListGroup.Item key={item.id}>{item.user.name}<ProgressBar now={now} label={`${now}%`} /></ListGroup.Item>
                )
            
            }}))
        })
        if (response.data.st == 1 ){
            setMsg(<Alert  variant="success" >{response.data.msg}</Alert>) 
              handleShow() 
              startCoffee(parseInt(response.data.date.getTime())) 
              
            }else{
             setMsg(<Alert  variant="danger" >{response.data.msg}</Alert>)
             }
        }
    ).catch((error) => {
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
        <Button variant="primary" onClick={() => {
        addCofee() }}>
        ir para o café
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} className="w-100">
        <Modal.Header closeButton>
          <Modal.Title >colaborador no café</Modal.Title>
        </Modal.Header>
        <Modal.Body>{timer}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            sair do café
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="cofee">
            <h1>colabores no café</h1>
            <ListGroup>
                {userCoffee}
            </ListGroup>
      </div>
    </div>
  );
}