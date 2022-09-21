
//import './styles/MapaArea.css';
import { useState, useEffect, } from 'react';
import Header from '../../components/Header';
import {Accordion, ListGroup, Alert, Form, FormLabel} from 'react-bootstrap';
import api from '../../components/api';
import City from '../../components/mapaArea/City';
import MapContext from './MapContext';
import AdmCity from '../../components/mapaArea/adm/City';
import {io} from "socket.io-client"
import { socket } from '../../components/socket';

export default function MapaArea() {
  const [city, setCity] = useState([])
  const [msg, setMsg] = useState('')
  const [startDate, setStartDate] = useState(new Date() )
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)))
  const [cities, setCities] = useState([])
  const [citieslist, setCitieslist] = useState([]) 
 
 
  



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
    
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
     // return socket.close();
    });
    socket.emit("selectRoom", {rom: "mapa"})
   

    setCity(
      <div className="w-full " type="button" disabled>
          <p className='ml-auto mr-auto d-blck w-max mt-40'>selecione uma cidade</p>
      </div>
    )
    if (localStorage.getItem('token') === null) {
      window.location.href = '/login'
  }
    api.get("/city",headers).then((response) =>
     setCities(response.data) )
     .catch((error) => {
      
      setMsg(<Alert  variant="danger" >{error.response.data.msg}</Alert>)

      if(error.response.status == 401){
        window.location.href = "/login"
      }
      
      console.log(error)
    })
socket.on("new", (data) => {
      console.log("new")
      console.log(citieslist)
    document.getElementById("research").click()
    //socket.close();
 }) 

  }, []);
 
  function deleteColeborator(id){
 
    api.post("/delete ",{
      id: id,
    }, headers ).then((response) => {
      socket.emit('new',id)
        closeMsg()
        setMsg(<Alert  variant="success" >{response.data.msg}</Alert>)
  }).catch((error) => {
    setMsg(<Alert  variant="danger" >{error.response.data.msg}</Alert>)
  })
  function editColaborator(id) { 
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
  })}}

  

  


  function closeMsg(){
   setTimeout(() => {
      setMsg('')
   }, 3000);
  }

  function search2(e){
    console.log(citieslist, e)
     if (!e || e.target.nodeName == "BUTTON"){
      console.log(citieslist)
    api.post("/search",{
      startDate: startDate,
      endDate: endDate,
      cities: citieslist
    }, headers  ).then((response) => 
          getMap(response.data)
          ).catch((error) => {
            setMsg(<Alert  variant="danger" >{error.response.data.msg}</Alert>)
          })
  } else if (e.target.type == "checkbox"){
    let b;
     b = citieslist
    if (e.target.checked){
       b.push(e.target.value)
    }else{
      const index = b.indexOf(e.target.value);
      b.splice(index, 1); 
    }
    console.log(citieslist)
    setCitieslist(b)
    console.log(citieslist)
    api.post("/search",{
      startDate: startDate,
      endDate: endDate,
      cities: citieslist
    }, headers  ).then((response) => 
          getMap(response.data)
          ).catch((error) => {
            setMsg(<Alert  variant="danger" >{error.response.data.msg}</Alert>)
          })
  }else {
    //let startdate = new Date(e.target.value)
    //let  endate = new Date(e.target.value)
    

    if (e.target.id == "startDate"){
      //startdate.setDate(startdate.getDate() )
       setStartDate(e.target.value)
       api.post("/search",{
        startDate: e.target.value,
        endDate: endDate,
        cities: citieslist
      }, headers  ).then((response) => 
            getMap(response.data)
            ).catch((error) => {
              setMsg(<Alert  variant="danger" >{error.response.data.msg}</Alert>)
            })
    }
   
    if (e.target.id == "endDate"){
      //endate.setDate(endate.getDate())
      setEndDate(new Date(e.target.value))
      api.post("/search",{
        startDate: startDate,
        endDate: e.target.value,
        cities: citieslist
      }, headers  ).then((response) => 
            getMap(response.data)
            ).catch((error) => {
              setMsg(<Alert  variant="danger" >{error.response.data.msg}</Alert>)
            })
    }
  }
  }

  function search(){
   
    //socket.emit('new')

    api.post("/search",{
      startDate: startDate,
      endDate: endDate,
      cities: citieslist
    }, headers  ).then((response) => 
          getMap(response.data)
          ).catch((error) => {
            setMsg(<Alert  variant="danger" >{error.response.data.msg}</Alert>)
          })
  }

    function showCity(){
      const list = document.getElementById("cities").classList
      const checkbox = document.querySelectorAll('input[type="checkbox"]:checked')
        let a = []
        checkbox.forEach((item) => 
        a.push(item.value)
        )
        setCitieslist(a)
      if (list.contains("d-none")){
        list.remove("d-none")
      }else{
        list.add("d-none")
      }
    }
useEffect(()=>{
    console.log(citieslist)
 }, [citieslist])



  return (
    <MapContext.Provider value={{socket, msg,citieslist,search,  getMap, deleteColeborator, setMsg, closeMsg}}>
    <div className="App">
      <Header />
      <button onClick={search2} className="d-none" id="research">research</button>
      {msg}
      <div className='flex self-center pl-28'>
        <span>de</span>
      <input type="date" id="startDate" className='date mt-2 ml-6 mr-2'  onChange={search2} />
      <span>até</span>
      <input type="date" id="endDate" className='date mt-2 ml-6'  onChange={search2} />
      <button className=' border mt-2 h-10 ml-2 w-20 border-black' onClick={showCity}>cidades</button>
      <div className='d-none' id="cities" aria-label="Default select example" size='sm'>
      <ul className='d-flex flex-col z-10 absolute p-2 bg-white border overflow-y-scroll'>
        <button className='border bg-blue-600 rounded-sm' onClick={()=> { showCity()}}>ok</button>
      {cities.map((city, index) =>{
      return(<li key={index} className='mt-2 p-2 bg-slate-300'>
       
        <input  type="checkbox" id={city.id} className='mr-2 cities' onChange={(e)=>{search2(e)}}  value={city.id} />
        <label htmlFor={city.id} >{city.name}</label>
        </li>
      )}
      )}
      <button className='border bg-blue-600 rounded-sm' onClick={()=> { showCity()}}>ok</button>
      </ul>
    </div></div>

    <ul className="float-right flex-col w-40 mr-20 ">
      <li className='flex justify-center items-center w-36 -ml-1'>
        <div className='rounded-full w-4 h-4 mr-1 bg-green-600'></div> 
        <div className='rounded-full w-4 h-4 mr-1 bg-orange-600'></div>
        <p className='m-0'>instalação</p>
      </li>
      <li className='flex justify-center items-center w-36'>
        <div className='rounded-full w-4 h-4 mr-1 bg-red-600'></div> 
        <div className='rounded-full w-4 h-4 mr-1 bg-violet-700'></div>
        <p className='m-0'>Reparo Dia</p>
      </li>
      <li className='flex justify-center items-center -ml-0.5 w-36'>
        
        <div className='rounded-full w-4 h-4 mr-1 bg-blue-700'></div>
        <p className='m-0'>Reparo Noite</p>
      </li>
     
    </ul>
      <div className='w-52'>
       
    </div>
      <Accordion alwaysOpen className='d-flex w-11/12 ml-auto mr-auto flex-wrap mt-3'>
     {city}
     </Accordion>
    </div>
    </MapContext.Provider>
  );
}


