
//import './styles/MapaArea.css';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import {Accordion, ListGroup, Alert} from 'react-bootstrap';
import api from '../../components/api';
import City from '../../components/mapaArea/City';
import MapContext from './MapContext';
import AdmCity from '../../components/mapaArea/adm/City';


export default function MapaArea() {
  const [city, setCity] = useState([])
  const [msg, setMsg] = useState('')
  const [date, setDate] = useState(new Date().toDateString('yyyy-mm-dd'))



  function getMap(data){
   if (localStorage.getItem('department') >= 3){
      setCity(
      <AdmCity data={data}/>
    )
      }else{
        setCity(
          <City data={data}/>
        )
      }
    
  }
  
  

  const headers = {
    headers: {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token')
    }
}
   
  useEffect(() => {
    setCity(
      <button className="btn btn-primary" type="button" disabled>
  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>
    )

    if (localStorage.getItem('token') === null) {
      window.location.href = '/login'
  }

    console.log(parseInt(localStorage.getItem('department')))
    api.get("/",headers).then((response) => getMap(response.data) ).catch((error) => {
      console.log(error)
    })

  }, []);




  function deleteColeborator(id){

    const headers = {
      headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
      }
  }
    
    api.post("/delete ",{
      id: id,
    }, headers ).then((response) => {
        setMsg(<Alert  variant="success" >{response.data.msg}</Alert>)
        api.get("/",headers)
        .then((response) => getMap(response.data) )
        .catch((error) => {
          setMsg(<Alert  variant="danger" >{error.response.data.msg}</Alert>)
        })      
  }).catch((error) => {
    setMsg(<Alert  variant="danger" >{error.response.data.msg}</Alert>)

  })
    
  }
  function search(item){
    setDate(document.getElementById('date').value)
    api.post("/search",{
      date: document.getElementById('date').value,
    }, headers  ).then((response) => 
          getMap(response.data)
          ).catch((error) => {
            setMsg(<Alert  variant="danger" >{error.response.data.msg}</Alert>)
          })
  }


  function closeMsg(){
    setMsg('')
  }

  return (
    <MapContext.Provider value={{date, getMap, deleteColeborator, setMsg, closeMsg}}>
    <div className="App">
      <Header />
      {msg}
      <input type="date" id="date" className='date mt-2 ml-36'  onChange={search} />

      <Accordion className='d-flex w-4/5 ml-auto mr-auto flex-wrap mt-1'>
     {city}
     </Accordion>
    </div>
    </MapContext.Provider>
  );
}


