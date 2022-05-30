import React from "react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import api from "../components/api";
import { Table, Button, Alert } from "react-bootstrap";
import './styles/ClientMassive.css'

export default function ClientMassive() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        api.get("/clientMassive").then((response) => {
          setClients(response.data)
            
        })
    }, []);

    return (
        <div>
            <Header />
            

            <Table striped bordered hover>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Problema</th>
      <th>cidade</th>
      <th>massiva</th>
      <th>status</th>
      <th>verificar</th>
    </tr>
  </thead>
  <tbody>
  
    {clients.map((item) => 
                
    <tr>
      <td>{item.name}</td>
      <td >{item.problem}</td>
      <td>{item.massive.city.name}</td>
      <td>{item.massive.id}</td>
      <th><Alert variant={'warning'}>a verificar</Alert></th>
      <th><Button variant={'success'}>verificado</Button></th>
    </tr>
                
            )}
  </tbody>
</Table>


        </div>
    );
}
