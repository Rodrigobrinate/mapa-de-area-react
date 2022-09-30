import { Accordion, ListGroup, Alert, OverlayTrigger,Tooltip, Button } from 'react-bootstrap';
import MapContext from '../../pages/mapa_area/MapContext';
import { useContext } from 'react';



export default function Colaborator(props) {
  const { data, } = props


  return (data.user_in_city.map((subitem, i) => {


    let a = i - 1
    if (a >= 0) {
      var previus_user = data.user_in_city[a].date.slice(8, 10)
      var current_user = subitem.date.slice(8, 10)
      var previus_user_type = data.user_in_city[a].type
      var previus_user_periodo = data.user_in_city[a].periodo
      var previus_user_name = data.user_in_city[a].user.name

    } else {
      var previus_user = null
      var current_user = subitem.date.slice(8, 10)
      var previus_user_type = null
      var previus_user_periodo = null
      var previus_user_name = null
    }

    if (subitem.type == 1 && subitem.periodo == 1) {
      return (
        <ListGroup className={`p-2  ${current_user == new Date().getDate() ? "bg-yellow-300" : 'bg-white'}`}>
          {current_user != previus_user ? <p className='mt-3'>Dia{subitem.date.slice(8, 10)}</p> : <p className='d-none'></p>}
          <ListGroup.Item style={{ backgroundColor: previus_user_type == subitem.type && previus_user_periodo == subitem.periodo && previus_user_name != subitem.user.name && current_user == previus_user ? "rgb(136, 51, 153)" : "#D94555" }} className="w-100 d-flex justify-between  ">
          <OverlayTrigger
          placement={'bottom'}
          overlay={
            <Tooltip id={localStorage.getItem('name')}>
              {subitem.user.name.replace("- FUNCIONÁRIO", "")}
            </Tooltip>
          }
        >
          <Button  variant="link" className='text-black p-0 ' style={{textDecoration: "none"}}>
          <p className='text-sm  p-0 m-0'>{subitem.user.name.slice(0, 10)}</p>
            </Button>
        </OverlayTrigger>
            <div className='h-2/5 d-flex justify-between'>

              <div>
                <p className='text-base mb-1'>Reparo</p>
                <p className='text-base mb-1'>Dia</p>
              </div>

            </div>

          </ListGroup.Item>
        </ListGroup>
      );
    }
    else if (subitem.type == 1 && subitem.periodo == 2) {
      return (
        <ListGroup className={`p-2  ${current_user == new Date().getDate() ? "bg-yellow-300" : 'bg-white'}`}>
          {current_user != previus_user ? <p className='mt-3'>Dia{subitem.date.slice(8, 10)}</p> : <p className='d-none'></p>}
          <ListGroup.Item style={{ backgroundColor: '#4B89DC' }} className="w-100 d-flex justify-between ">
          <OverlayTrigger
          placement={'bottom'}
          overlay={
            <Tooltip id={localStorage.getItem('name')}>
              {subitem.user.name.replace("- FUNCIONÁRIO", "")}
            </Tooltip>
          }
        >
          <Button  variant="link" className='text-black p-0 ' style={{textDecoration: "none"}}>
          <p className='text-sm  p-0 m-0'>{subitem.user.name.slice(0, 10)}</p>
            </Button>
        </OverlayTrigger>
            <div className='h-2/5 d-flex justify-between'>

              <div>
                <p className='text-sm mb-1'>Reparo</p>
                <p className='text-sm mb-1'>Noite</p>
              </div>
            </div>

          </ListGroup.Item>
        </ListGroup>
      );
    }

    else if (subitem.type == 2 && subitem.periodo == 2) {
      return (

        <ListGroup className={`p-2  ${current_user == new Date().getDate() ? "bg-yellow-300" : 'bg-white'}`}>
          {current_user != previus_user ? <p className='mt-3'>Dia{subitem.date.slice(8, 10)}</p> : <p className='d-none'></p>}
          <ListGroup.Item className="w-100 d-flex justify-between mt-3">
          <OverlayTrigger
          placement={'bottom'}
          overlay={
            <Tooltip id={localStorage.getItem('name')}>
              {subitem.user.name}
            </Tooltip>
          }
        >
          <Button  variant="link" className='text-black p-0 ' style={{textDecoration: "none"}}>
          <p className='text-sm  p-0 m-0'>{subitem.user.name.slice(0, 10)}</p>
            </Button>
        </OverlayTrigger>
            <div className='h-2/5 d-flex justify-between'>

              <div>
                <p className='text-sm mb-1'>Instalação</p>
                <p className='text-sm mb-1'>Noite</p>
              </div>
            </div>

          </ListGroup.Item>
        </ListGroup>

      );
    } else if (subitem.type == 2 && subitem.periodo == 1) {
      return (

        <ListGroup className={`p-2  ${current_user == new Date().getDate() ? "bg-yellow-300" : 'bg-white'}`}>
          {current_user != previus_user ? <p className='mt-3'>Dia{subitem.date.slice(8, 10)}</p> : <p className='d-none'></p>}
          <ListGroup.Item style={{ backgroundColor: previus_user_type == subitem.type && previus_user_periodo == subitem.periodo && previus_user_name != subitem.user.name && current_user == previus_user ? "#ea580c" : "#36BC9B" }} className="w-100 d-flex justify-between ">
          <OverlayTrigger
          placement={'bottom'}
          overlay={
            <Tooltip id={localStorage.getItem('name')}>
              {subitem.user.name.replace("- FUNCIONÁRIO", "")}
            </Tooltip>
          }
        >
          <Button  variant="link" className='text-black p-0 ' style={{textDecoration: "none"}}>
          <p className='text-sm  p-0 m-0'>{subitem.user.name.slice(0, 10)}</p>
            </Button>
        </OverlayTrigger>
            
            <div className='h-2/5 d-flex justify-between'>

              <div>
                <p className='text-sm mb-1'>Instalação</p>
                <p className='text-sm mb-1'>Dia </p>
              </div>
            </div>

          </ListGroup.Item>
        </ListGroup>

      );
    }

  }


  )
  )


}