
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


    var config = {
      method: 'get',
      url: 'https://synsuite.acesse.net.br:45701/api/v1/isp/olt/integration/all',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBBRjZDREEyRDU0MTRDRTY1MUM0RTk3NTM3QTFGNEY0QTMyNUQ5QTMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDdmJOb3RWQlRPWlJ4T2wxTjZIMDlLTWwyYU0ifQ.eyJuYmYiOjE2NjM0MzA2ODgsImV4cCI6MTY2MzQzNDI4OCwiaXNzIjoiaHR0cHM6Ly9zeW5zdWl0ZS5hY2Vzc2UubmV0LmJyOjQ1NzAwIiwiYXVkIjpbImh0dHBzOi8vc3luc3VpdGUuYWNlc3NlLm5ldC5icjo0NTcwMC9yZXNvdXJjZXMiLCJzeW5ndyIsInN5bnBheWd3Il0sImNsaWVudF9pZCI6InN5bmF1dGgiLCJzdWIiOiJyb2RyaWdvLnByb3RhemlvIiwiYXV0aF90aW1lIjoxNjYzNDMwNjg4LCJpZHAiOiJsb2NhbCIsImlkIjoiMjY1IiwibG9naW4iOiJyb2RyaWdvLnByb3RhemlvIiwibW9kZSI6InN5c3RlbSIsIm5hbWUiOiJSb2RyaWdvIEJyaW5hdGUgUHJvdGF6aW8gIC0gRnVuY2lvbsOhcmlvIiwicGVyc29uZW1haWwiOiJyb2RyaWdvLnByb3RhemlvQGFjZXNzZXJhZGlvLmNvbS5iciIsInBlcnNvbmlkIjoiMTQ2MTQ2IiwicGVyc29ubmFtZSI6IlJvZHJpZ28gQnJpbmF0ZSBQcm90YXppbyAgLSBGdW5jaW9uw6FyaW8iLCJwbGFjZWlkIjoiIiwicHJvZmlsZWlkIjoiNyIsInN5bmRhdGEiOiJUV3BOTVU5RVl6VmFha2sxVDBkU2FVMVVTbXhhYWxwcldsZEZkMDB5U1RGWlYxSnNUVEpSTUZwdFVUMDZXbGhzUzFaSFZsaE9WV3hwVFRBMGQxTlhjSFpoVlRGVlducE9UV0Z0YzNkVVIzQktaREE1UkU1SWFFNVNSV3h3VkVWT1MxWkhWbGhPVlZaYVlWVnJNbE5YTVZOaFZuQllUVmhrVGxKRlJqWlVNVkpxWVZkYVVsQlVNRDA2V2xSb2EwMXFUVEZaYW1zd1dYcHNhVTVFVG0xYVJHY3pUVVJzYTAxcVdUSlpla0Y0VFVkTk0wMUhWVDA9IiwidHhpZCI6IjE0NzgwMzEwNjk1IiwidHlwZXR4aWQiOiIyIiwibGl2ZWNoYXRhZ2VudCI6IkZhbHNlIiwidHlwZSI6InVzZXItc3lzdGVtIiwiaW50ZWdyYXRpb24iOiJhbGwiLCJvbW5pY2hhbm5lbCI6IntcIlJvY2tldGNoYXRVc2VySWRcIjpudWxsLFwiUm9ja2V0Y2hhdFVzZXJcIjpudWxsfSIsInNjb3BlIjpbInN5bmd3Iiwic3lucGF5Z3ciLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.lYOQMo-A7oqsNwPhV-kYZt711b2hFcTYq7_Yp3uV6TPTrOf9buwg6jD8zFTfxvpsrYZeNDEKxXLkJTEQZFOHcNpz3Nj4x5Gn0WzmBBSC-Jm2XNqKhY_9zPlFaOXTcbIbb4RvcWPLcdQFA6sgwy0whIPjgzONPt1qtz7fkslmEk9XVwsWsJyL7ziITr07qA1vKbW1rHFO_wTITmenR8vPMhp75bZeISsreHAuWMekyKGJY5h50RsH1x6qyqu9wRyS3KAv3ZQbMm7djamig6MUgrSMumMDlKotvKVQkBHK3t8Vo7UqCxrdF5Yqi6VLs-WttiCqMuFRWFCXHiuW4B1t_XDP3f_9iA3eafva_97m2oWXp6MLdRcnl7uUsrcjsRt45rKdtrac8DKvM64ahkLn68i-0lk-bbOhKBVMvPi3iWifWGZc_xqR5Zd5ElSDe17afcJEFZGpbfJOOcxJF7NF6At24bSi9Uvd1Q8opcCIj_A--_EySXpKHaL0AyDxLc9DypC4LVwItZI0A3ANIZYz6JTVGeE2BlDVq5fw2sCXK4Ad2oxc-bW2gx-SMb0tWnXi4H286OTeB7MXkZqIjCo9KamSzdkqRxEAGg6e-nxyftMTUd110kfneUZwFtDWuz7iebmhUPcErYPS6Dr5wUyPA1QU1I46C--aINm9MNp6wLE'
      }
    };

    var configCto = {
      method: 'get',
      url: 'https://synsuite.acesse.net.br:45701/api/v1/isp/networkboxes/integration/all',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBBRjZDREEyRDU0MTRDRTY1MUM0RTk3NTM3QTFGNEY0QTMyNUQ5QTMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDdmJOb3RWQlRPWlJ4T2wxTjZIMDlLTWwyYU0ifQ.eyJuYmYiOjE2NjM0MzA2ODgsImV4cCI6MTY2MzQzNDI4OCwiaXNzIjoiaHR0cHM6Ly9zeW5zdWl0ZS5hY2Vzc2UubmV0LmJyOjQ1NzAwIiwiYXVkIjpbImh0dHBzOi8vc3luc3VpdGUuYWNlc3NlLm5ldC5icjo0NTcwMC9yZXNvdXJjZXMiLCJzeW5ndyIsInN5bnBheWd3Il0sImNsaWVudF9pZCI6InN5bmF1dGgiLCJzdWIiOiJyb2RyaWdvLnByb3RhemlvIiwiYXV0aF90aW1lIjoxNjYzNDMwNjg4LCJpZHAiOiJsb2NhbCIsImlkIjoiMjY1IiwibG9naW4iOiJyb2RyaWdvLnByb3RhemlvIiwibW9kZSI6InN5c3RlbSIsIm5hbWUiOiJSb2RyaWdvIEJyaW5hdGUgUHJvdGF6aW8gIC0gRnVuY2lvbsOhcmlvIiwicGVyc29uZW1haWwiOiJyb2RyaWdvLnByb3RhemlvQGFjZXNzZXJhZGlvLmNvbS5iciIsInBlcnNvbmlkIjoiMTQ2MTQ2IiwicGVyc29ubmFtZSI6IlJvZHJpZ28gQnJpbmF0ZSBQcm90YXppbyAgLSBGdW5jaW9uw6FyaW8iLCJwbGFjZWlkIjoiIiwicHJvZmlsZWlkIjoiNyIsInN5bmRhdGEiOiJUV3BOTVU5RVl6VmFha2sxVDBkU2FVMVVTbXhhYWxwcldsZEZkMDB5U1RGWlYxSnNUVEpSTUZwdFVUMDZXbGhzUzFaSFZsaE9WV3hwVFRBMGQxTlhjSFpoVlRGVlducE9UV0Z0YzNkVVIzQktaREE1UkU1SWFFNVNSV3h3VkVWT1MxWkhWbGhPVlZaYVlWVnJNbE5YTVZOaFZuQllUVmhrVGxKRlJqWlVNVkpxWVZkYVVsQlVNRDA2V2xSb2EwMXFUVEZaYW1zd1dYcHNhVTVFVG0xYVJHY3pUVVJzYTAxcVdUSlpla0Y0VFVkTk0wMUhWVDA9IiwidHhpZCI6IjE0NzgwMzEwNjk1IiwidHlwZXR4aWQiOiIyIiwibGl2ZWNoYXRhZ2VudCI6IkZhbHNlIiwidHlwZSI6InVzZXItc3lzdGVtIiwiaW50ZWdyYXRpb24iOiJhbGwiLCJvbW5pY2hhbm5lbCI6IntcIlJvY2tldGNoYXRVc2VySWRcIjpudWxsLFwiUm9ja2V0Y2hhdFVzZXJcIjpudWxsfSIsInNjb3BlIjpbInN5bmd3Iiwic3lucGF5Z3ciLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.lYOQMo-A7oqsNwPhV-kYZt711b2hFcTYq7_Yp3uV6TPTrOf9buwg6jD8zFTfxvpsrYZeNDEKxXLkJTEQZFOHcNpz3Nj4x5Gn0WzmBBSC-Jm2XNqKhY_9zPlFaOXTcbIbb4RvcWPLcdQFA6sgwy0whIPjgzONPt1qtz7fkslmEk9XVwsWsJyL7ziITr07qA1vKbW1rHFO_wTITmenR8vPMhp75bZeISsreHAuWMekyKGJY5h50RsH1x6qyqu9wRyS3KAv3ZQbMm7djamig6MUgrSMumMDlKotvKVQkBHK3t8Vo7UqCxrdF5Yqi6VLs-WttiCqMuFRWFCXHiuW4B1t_XDP3f_9iA3eafva_97m2oWXp6MLdRcnl7uUsrcjsRt45rKdtrac8DKvM64ahkLn68i-0lk-bbOhKBVMvPi3iWifWGZc_xqR5Zd5ElSDe17afcJEFZGpbfJOOcxJF7NF6At24bSi9Uvd1Q8opcCIj_A--_EySXpKHaL0AyDxLc9DypC4LVwItZI0A3ANIZYz6JTVGeE2BlDVq5fw2sCXK4Ad2oxc-bW2gx-SMb0tWnXi4H286OTeB7MXkZqIjCo9KamSzdkqRxEAGg6e-nxyftMTUd110kfneUZwFtDWuz7iebmhUPcErYPS6Dr5wUyPA1QU1I46C--aINm9MNp6wLE'
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
