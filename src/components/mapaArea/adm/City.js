
import {Accordion, ListGroup, Alert, Modal,Button} from 'react-bootstrap';
import api from '../../api';
import { useState, useContext, Suspense } from 'react';
import Colaborator from './Colaborator'
import MapContext from '../../../pages/mapa_area/MapContext';


export default function City(props){
  
    
    const {data} = props
    const [show, setShow] = useState(false);
    const [input, setInput] = useState(null)
    const [colaborator, setColaborator] = useState([])
    const [userId, setUserId] = useState(0)
    const [cityId, setCityId] = useState(0)
    const [type, setType] = useState(1)
    const [time, setTime] = useState(1)
    const [date, setDate] = useState(new Date().toDateString('yyyy-mm-dd'))

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  const headers = {
          headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
          }
      }
      const { socket, msg, search, citieslist,  getMap, setMsg, closeMsg } = useContext(MapContext)

    function searchColaborator(e) {
      if (e.target.value.lenght <1){
        
      }
      setInput(e.target.value)
     api.get("/colaborator/"+e.target.value, headers)
        .then((response) => 
        setColaborator(response.data))

    }

    function select(e,id) {
      console.log(e, id)
     console.log(e.target.outerText)
     document.getElementById('colaborator').outerText = e.target.outerText
     //document.getElementById('colaborator').value = id
     
     setUserId(id)
      
//console.log(id)
      setInput(e.target.outerText)
      setColaborator([])
    }

    function createColaborator(e){
        
      api.post("/create ",{
        city: cityId,
        colaborator:  userId,
        period: time,
        type: type,
        date:  date

      }, headers ).then((response) => {
         socket.emit('new', cityId)
        
        handleClose();
        setTime(1)
        setType(1)
        
        
        
        //api.get("/",headers).then((response) => getMap(response.data) )
    
      }).catch((response)=> {
      closeMsg()
       setMsg(<Alert  variant="danger" className=' w-96 d-flex justify-between'  >{response.response.data.msg}
       <button type="button" className="close -mt-8 absolute z-20" data-dismiss="alert" onClick={closeMsg} aria-label="Close">
        <span aria-hidden="true">&times;</span>
       </button></Alert>)
      
      })
    }


    return (

    data.map((subArray, i) => {
      subArray.user_in_city.sort((a, b) => new Date(a.date) - new Date(b.date));
    return (
          <Accordion.Item eventKey={subArray.id} xl={4} className="w-72 border">
            <Accordion.Header>{subArray.name}</Accordion.Header>
            <Accordion.Body>
              <ListGroup.Item>
                 <Colaborator data={subArray} cities={data} current={i} />
                 <button onClick={()=> {handleShow();setCityId(subArray.id) }} id="add" className='w-full bg-green-700  mt-3 rounded-md'>+</button>
              </ListGroup.Item>
              </Accordion.Body>
              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>adicionar Técnico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {msg}
          <span className='mt-3' >selecione o técnico</span>
          <input type="text" className='w-full' id="colaborator" value={input} onChange={(e) => {searchColaborator(e)}} />
          <input type="hidden" id='colaborator_id' />
          <ul id="listc" className='border list d-block'>
             {colaborator.map((item) =>         
            <li key={item.id} className='list-none p-1 hover:bg-gray-400' onClick={(e) => {select(e, item.id)}} >{item.name}</li>
            )}
            
          </ul>
          <span className='mt-3' >selecione o período</span>
          <select id='time'  className='p-2 rounded-sm' onClick={(e)=>{setTime(e.target.value)}} onChange={(e)=>{setTime(e.target.value)}}>
            {type == 2 ?  <option value="1">dia</option> : <> <option value="1">dia</option><option value="2">noite</option></>}
           
          </select>
          <span className='mt-3'>selecione a data</span>
          <input type="date" id='date' onChange={(e) => {setDate(e.target.value)}} className="mt-2" />
          <span  className='mt-3' >selecione o tipo de serviço</span>
          <select id='type'  className='p-2 rounded-sm'  onClick={(e)=>{setType(e.target.value)}} onChange={(e)=>{setType(e.target.value)}}>
            {time == 2 ?  <option value="1">manutenção</option> : <><option value="1">manutenção</option><option value="2">instalação</option></>}
            
            
            
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" id="adic" onClick={(e)=> {createColaborator(e)}}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
      </Accordion.Item>

      
   

    )})
    )
}