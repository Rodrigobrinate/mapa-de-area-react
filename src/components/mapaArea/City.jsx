
import { Accordion, ListGroup, Alert, Modal, Button } from 'react-bootstrap';
import api from '../api';
import { useState, useContext } from 'react';
import Colaborator from './Colaborator'
import MapContext from '../../pages/mapa_area/MapContext';


export default function City(props) {


  const { data } = props
  const [show, setShow] = useState(false);
  const [input, setInput] = useState(null)
  const [colaborator, setColaborator] = useState([])
  const [userId, setUserId] = useState(0)
  const [cityId, setCityId] = useState(0)
  const [type, setType] = useState(1)
  const [time, setTime] = useState(1)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  }
  const { date, getMap, setMsg, closeMsg } = useContext(MapContext)


  function searchColaborator(e) {
    if (e.target.value.lenght < 1) {

    }
    setInput(e.target.value)
    api.get("/colaborator/" + e.target.value, headers)
      .then((response) =>
        setColaborator(response.data))

  }

  function select(e, id) {

    console.log(e.target.outerText)
    document.getElementById('colaborator').outerText = e.target.outerText
    document.getElementById('colaborator').value = id
    setUserId(id)

    //console.log(id)
    setInput(e.target.outerText)
    setColaborator([])
  }

  function createColaborator(e) {
    console.log(userId, cityId)
    api.post("/create ", {
      city: cityId,
      colaborator: userId,
      period: time,
      type: type,
      date: date

    }, headers).then((response) => {
      handleClose();
      setTime(1)
      setType(1)
      api.get("/", headers).then((response) => getMap(response.data))

    }).catch((response) =>
      setMsg(<Alert variant="danger" className='absolute w-96 d-flex justify-between' style={{ zIndex: '10000' }} >{response.response.data.msg}
        <button type="button" className="close -mt-8" data-dismiss="alert" onClick={closeMsg} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button></Alert>)

    )
  }

  function deleteColeborator(id) {
    api.post("/delete ", {
      id: id,
    }, headers).then((response) => {
      if (response.data.st === 1) {
        setMsg(<Alert variant="success" >{response.data.msg}</Alert>)
        api.get("/", headers).then((response) => console.log(response))
      } else {
        setMsg(<Alert variant="danger" >{response.data.msg}</Alert>)
      }
    })
  }
  return (

    data.response.map((subArray) =>
      <Accordion.Item eventKey={subArray.id} xl={4} className="w-72 border">
        <Accordion.Header>{subArray.name}</Accordion.Header>
        <Accordion.Body>
          <ListGroup.Item>
            <Colaborator data={subArray} />

          </ListGroup.Item>
        </Accordion.Body>

      </Accordion.Item>




    )
  )
}