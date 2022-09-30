import { Accordion, ListGroup, Alert, OverlayTrigger,Tooltip, Button } from 'react-bootstrap';
import MapContext from '../../../pages/mapa_area/MapContext';
import { useContext } from 'react';
import { useEffect } from 'react';



export default function Colaborator(props) {
  const { data, cities, current } = props

  const { deleteColeborator, editColaborator, setMsg } = useContext(MapContext)




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




    if (subitem.type == 1 && subitem.periodo == 1) {//console.log(data.user_in_city[i].date, i)
      return (
        <ListGroup key={i} className={`p-2  ${current_user == new Date().getDate() ? "bg-yellow-300" : 'bg-white'}`} >
          {current_user != previus_user ? <p className='mt-3'>Dia{subitem.date.slice(8, 10)}</p> : <p className='d-none'></p>}

          <ListGroup.Item style={{ backgroundColor: previus_user_type == subitem.type && previus_user_periodo == subitem.periodo && previus_user_name != subitem.user.name && current_user == previus_user ? "rgb(136, 51, 153)" : "#D94555" }} className="w-100 d-flex justify-between mt-0 bg-red-700">
          <OverlayTrigger
          placement={'bottom'}
          overlay={
            <Tooltip id={localStorage.getItem('name')}>
              {subitem.user.name.replace("- FUNCIONÁRIO", "")}
            </Tooltip>
          }
        >
          <Button  variant="link" className='text-black p-0 outline-none' style={{textDecoration: "none"}}>
          <p className='text-sm  p-0 m-0'>{subitem.user.name.slice(0, 10)}</p>
            </Button>
        </OverlayTrigger>
            <div className='h-2/5 d-flex justify-between'>

              <div className='mr-2 '>
                <p className='text-sm mb-1'>Reparo</p>
                <p className='text-sm mb-1'>Dia</p>
              </div>
              <div>
                <img
                  className='delete w-4 h-4'
                  width="15px"
                  onClick={() => deleteColeborator(subitem.id)} height="15px"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUVJREFUSEvFlesxBEEURs9mQARkgAiQARkQAZkQAhGQARkgAjYDGVBnqnvrutNbOz1bW/rXPLq/x331gh2vxY7xWUdwBdwAxxMFvAP3wGPenwn2gJcO4Iwn0TnwXX9kAjccAUvgFvD9a4OLwyJIBwflzEmLQMC7Am5oViomhkn3CpLkGnjwXHRQ1V8CzxNB87YL4Cm6iAQ/Zfd+Uu+h14YjFZ8lMYbrs+AM2C2C+C0qismLxZAdV6GTCARSvYmvFaKwWmkfxUXMVxeBYJnEbxZBC9x/3QSZxPd14FsRxAYcNVQop24HMaEqd8Wc5H7pIsjglqUrJ352kmuZ5pjHxG9VpqrdaaP1TozoeBj1mzq5h8CwvQGOi+aw+5P9DmQBrSrHtc/ma3VRtRx0YI+2jhowElh6pzPRBdbBcAfE9W+X/kwj42O/dzthGS5ZnbUAAAAASUVORK5CYII="
                />

             {/*}   <img
                  className='w-4 h-4'
                  onClick={() => editColaborator(subitem.id)}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEEklEQVR4nO2bSYgUVxjHfzPtuBt1cEEdTfAwgnoybsxBZPAQF1AGB0UFVxAUFRcMYg4qogfRy6AiIREUUQzERBGX0UuMggtuuK+oiaJExcg40XZsD9+U71XbU1Wt/VVZnf5BQdP9r57//1VNvfe+9xoKFChQoECB/y2JqA140AooA94AyYi9hEYJsAS4BqQaj3fAGWAqUBSdNX06A6cxwTMdB4HWURnUJAH8iXd459gTkUdV5hIsvHOMjsamDu2BJ2TXAL9G4lSJtWQXPgXcj8SpAh2BV2TfAM9yZaA4V1/0ibQEmn/CeY9yZSDqBngETAAeZnneEQUvkdIWWAPU43/7J4HyaGzq0xPYhncDbIzMXY5oBxwALgMDm9BUAhf5OPxzZMQYa9ZjAm320DUD5gD/WPpF6u6UKQdeYwJVBTinFFiGhI/6of3Z7MeEP0aez+7SGYEJ3wB8G62dcCkBrmAaYIuPfghwA+nv2+haC4cFBH+SlyA9hKMfpe5OmU7I2N0JtNBHP9/Svmg8P9ZswgS6ilzhpijF3e0tVnenTF9k6OoEGumj32xpbwItVN2FwCFMoH0+2n64Gyv2VZ8qTJjXQB8f/WFLX6trTZ/mSDfmBFrnox9vaZPI3RBrlmECPUbqfk3RErhj6Teou1OmK9J9OYFm+eh/sLRPkZ4g1mzFBDqL9/JbD+ClpZ+t7k6ZAcg43wk0zEe/3dJeQqbAsaUI+AMTaKePfiiy7ufoh6u6C4HJmDCvgK89tEXASUu/W92dMq2Ae5hAK3z00yxtPfCNqrsQWIkJ9ADvKWxb4G9Lv0rdnTJlQB0m0EQfvb0U9hd5MN/fhQl0HO8yV2/ctf/J6u6UqcA8yRuAQT763zDhTxDzmmAxcAoT6EcffaWlbQAGq7oLgZmYQP8C3Ty0CdwLHT+ru1OmHbKg6QRa4qOfR/DGigV2t3cL78pNR9xlru/V3SlTinu2N9ZHX0PwxooFyzGBTuH9JE8vc41TdxcC1wl+9WstbezLXCDL2Xalx2v6Os7SJoH+6u5CYCnBNip8hXtyVKNvLRz2YUJVe+h+snRPyIMyl8NdTLCyJjSzLU2QyVFsSCBb11PAf2R++o+xNCngl9DchUB3TLA7GT6vxr374zwy988b+mHCnbHeTwCrcRdD7wG9wjaoTQUm4NHG98qRrS72//x18jA8yEYFJ+ReZAKUvs/3KNAlKoPaTMI9n7eDJ5EJ0pf8G6SMZLMQ0cF6bW9XuwTMQH7ukk45MlzO5fa2d8DvyOKrTTFykQB2IBcmp9gLnimku1uJ927v22nn5Oq4leFvTbE+D1xrzOYOuG29PgdMBy5kcf4XSTYNsBsZ/BQjA5y3Ac75DhkJ5rL0XYdUotNxbvsgy3IfeA+10KdH2qoQhAAAAABJRU5ErkJggg=="
        />*/}
                </div>
            </div>

          </ListGroup.Item>
        </ListGroup>
      );
    }
    else if (subitem.type == 1 && subitem.periodo == 2) {
      return (
        <ListGroup className={`p-2  ${current_user == new Date().getDate() ? "bg-yellow-300" : 'bg-white'}`}>
          {current_user != previus_user ? <p className='mt-3'>Dia{subitem.date.slice(8, 10)}</p> : <p></p>}
          <ListGroup.Item  style={{ backgroundColor: '#4B89DC' }} className="w-100 d-flex justify-between mt-0">
          <OverlayTrigger
          placement={'bottom'}
          overlay={
            <Tooltip id={localStorage.getItem('name')}>
              {subitem.user.name.replace("- FUNCIONÁRIO", "")}
            </Tooltip>
          }
        >
          <Button  variant="link" className='text-black p-0 outline-none' style={{textDecoration: "none"}}>
          <p className='text-sm  p-0 m-0'>{subitem.user.name.slice(0, 10)}</p>
            </Button>
        </OverlayTrigger>
            <div className='h-2/5 d-flex justify-between'>

              <div className='mr-2'>
                <p className='text-sm mb-1'>Reparo</p>
                <p className='text-sm mb-1'>Noite</p>
              </div>
              <div>
                <img
                  className='delete w-4 h-4'
                  width="15px"
                  onClick={() => deleteColeborator(subitem.id)}
                  height="15px"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUVJREFUSEvFlesxBEEURs9mQARkgAiQARkQAZkQAhGQARkgAjYDGVBnqnvrutNbOz1bW/rXPLq/x331gh2vxY7xWUdwBdwAxxMFvAP3wGPenwn2gJcO4Iwn0TnwXX9kAjccAUvgFvD9a4OLwyJIBwflzEmLQMC7Am5oViomhkn3CpLkGnjwXHRQ1V8CzxNB87YL4Cm6iAQ/Zfd+Uu+h14YjFZ8lMYbrs+AM2C2C+C0qismLxZAdV6GTCARSvYmvFaKwWmkfxUXMVxeBYJnEbxZBC9x/3QSZxPd14FsRxAYcNVQop24HMaEqd8Wc5H7pIsjglqUrJ352kmuZ5pjHxG9VpqrdaaP1TozoeBj1mzq5h8CwvQGOi+aw+5P9DmQBrSrHtc/ma3VRtRx0YI+2jhowElh6pzPRBdbBcAfE9W+X/kwj42O/dzthGS5ZnbUAAAAASUVORK5CYII="
                />
              {/*}  <img
                  className='w-4 h-4'
                  onClick={() => editColaborator(subitem.id)}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEEklEQVR4nO2bSYgUVxjHfzPtuBt1cEEdTfAwgnoybsxBZPAQF1AGB0UFVxAUFRcMYg4qogfRy6AiIREUUQzERBGX0UuMggtuuK+oiaJExcg40XZsD9+U71XbU1Wt/VVZnf5BQdP9r57//1VNvfe+9xoKFChQoECB/y2JqA140AooA94AyYi9hEYJsAS4BqQaj3fAGWAqUBSdNX06A6cxwTMdB4HWURnUJAH8iXd459gTkUdV5hIsvHOMjsamDu2BJ2TXAL9G4lSJtWQXPgXcj8SpAh2BV2TfAM9yZaA4V1/0ibQEmn/CeY9yZSDqBngETAAeZnneEQUvkdIWWAPU43/7J4HyaGzq0xPYhncDbIzMXY5oBxwALgMDm9BUAhf5OPxzZMQYa9ZjAm320DUD5gD/WPpF6u6UKQdeYwJVBTinFFiGhI/6of3Z7MeEP0aez+7SGYEJ3wB8G62dcCkBrmAaYIuPfghwA+nv2+haC4cFBH+SlyA9hKMfpe5OmU7I2N0JtNBHP9/Svmg8P9ZswgS6ilzhpijF3e0tVnenTF9k6OoEGumj32xpbwItVN2FwCFMoH0+2n64Gyv2VZ8qTJjXQB8f/WFLX6trTZ/mSDfmBFrnox9vaZPI3RBrlmECPUbqfk3RErhj6Teou1OmK9J9OYFm+eh/sLRPkZ4g1mzFBDqL9/JbD+ClpZ+t7k6ZAcg43wk0zEe/3dJeQqbAsaUI+AMTaKePfiiy7ufoh6u6C4HJmDCvgK89tEXASUu/W92dMq2Ae5hAK3z00yxtPfCNqrsQWIkJ9ADvKWxb4G9Lv0rdnTJlQB0m0EQfvb0U9hd5MN/fhQl0HO8yV2/ctf/J6u6UqcA8yRuAQT763zDhTxDzmmAxcAoT6EcffaWlbQAGq7oLgZmYQP8C3Ty0CdwLHT+ru1OmHbKg6QRa4qOfR/DGigV2t3cL78pNR9xlru/V3SlTinu2N9ZHX0PwxooFyzGBTuH9JE8vc41TdxcC1wl+9WstbezLXCDL2Xalx2v6Os7SJoH+6u5CYCnBNip8hXtyVKNvLRz2YUJVe+h+snRPyIMyl8NdTLCyJjSzLU2QyVFsSCBb11PAf2R++o+xNCngl9DchUB3TLA7GT6vxr374zwy988b+mHCnbHeTwCrcRdD7wG9wjaoTQUm4NHG98qRrS72//x18jA8yEYFJ+ReZAKUvs/3KNAlKoPaTMI9n7eDJ5EJ0pf8G6SMZLMQ0cF6bW9XuwTMQH7ukk45MlzO5fa2d8DvyOKrTTFykQB2IBcmp9gLnimku1uJ927v22nn5Oq4leFvTbE+D1xrzOYOuG29PgdMBy5kcf4XSTYNsBsZ/BQjA5y3Ac75DhkJ5rL0XYdUotNxbvsgy3IfeA+10KdH2qoQhAAAAABJRU5ErkJggg=="
        />*/}
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
          <ListGroup.Item className="w-100 d-flex justify-between mt-0">
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
                <p className='text-sm mb-1'>Noite</p>
              </div><img
                className='delete w-4 h-4'
                width="15px"
                onClick={() => deleteColeborator(subitem.id)} height="15px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUVJREFUSEvFlesxBEEURs9mQARkgAiQARkQAZkQAhGQARkgAjYDGVBnqnvrutNbOz1bW/rXPLq/x331gh2vxY7xWUdwBdwAxxMFvAP3wGPenwn2gJcO4Iwn0TnwXX9kAjccAUvgFvD9a4OLwyJIBwflzEmLQMC7Am5oViomhkn3CpLkGnjwXHRQ1V8CzxNB87YL4Cm6iAQ/Zfd+Uu+h14YjFZ8lMYbrs+AM2C2C+C0qismLxZAdV6GTCARSvYmvFaKwWmkfxUXMVxeBYJnEbxZBC9x/3QSZxPd14FsRxAYcNVQop24HMaEqd8Wc5H7pIsjglqUrJ352kmuZ5pjHxG9VpqrdaaP1TozoeBj1mzq5h8CwvQGOi+aw+5P9DmQBrSrHtc/ma3VRtRx0YI+2jhowElh6pzPRBdbBcAfE9W+X/kwj42O/dzthGS5ZnbUAAAAASUVORK5CYII="
              />
            </div>

          </ListGroup.Item>
        </ListGroup>

      );
    } else if (subitem.type == 2 && subitem.periodo == 1) {
      return (

        <ListGroup className={`p-2  ${current_user == new Date().getDate() ? "bg-yellow-300" : 'bg-white'}`}>
          {current_user != previus_user ? <p className='mt-3'>Dia{subitem.date.slice(8, 10)}</p> : <p className='d-none'></p>}
          <ListGroup.Item style={{ backgroundColor: previus_user_type == subitem.type && previus_user_periodo == subitem.periodo && previus_user_name != subitem.user.name && current_user == previus_user ? "#ea580c" : "#36BC9B" }} className="w-100 d-flex justify-between mt-0">
          <OverlayTrigger
          placement={'bottom'}
          overlay={
            <Tooltip id={localStorage.getItem('name')}>
              {subitem.user.name.replace("- FUNCIONÁRIO", "")}
            </Tooltip>
          }
        >
          <Button  variant="link" className='text-black p-0 ' style={{textDecoration: "none"}}>
          <p className='text-sm  p-0 m-0'>{subitem.user.name.slice(0, 8)}</p>
            </Button>
        </OverlayTrigger>
            <div className='h-2/5 d-flex justify-between'>

              <div className='mr-2'>
                <p className='text-sm mb-1'>Instalação</p>
                <p className='text-sm mb-1'>Dia</p>
              </div>
              <div>
                <img
                  className='delete w-4 h-4'
                  width="15px"
                  onClick={() => deleteColeborator(subitem.id)}
                  height="15px"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUVJREFUSEvFlesxBEEURs9mQARkgAiQARkQAZkQAhGQARkgAjYDGVBnqnvrutNbOz1bW/rXPLq/x331gh2vxY7xWUdwBdwAxxMFvAP3wGPenwn2gJcO4Iwn0TnwXX9kAjccAUvgFvD9a4OLwyJIBwflzEmLQMC7Am5oViomhkn3CpLkGnjwXHRQ1V8CzxNB87YL4Cm6iAQ/Zfd+Uu+h14YjFZ8lMYbrs+AM2C2C+C0qismLxZAdV6GTCARSvYmvFaKwWmkfxUXMVxeBYJnEbxZBC9x/3QSZxPd14FsRxAYcNVQop24HMaEqd8Wc5H7pIsjglqUrJ352kmuZ5pjHxG9VpqrdaaP1TozoeBj1mzq5h8CwvQGOi+aw+5P9DmQBrSrHtc/ma3VRtRx0YI+2jhowElh6pzPRBdbBcAfE9W+X/kwj42O/dzthGS5ZnbUAAAAASUVORK5CYII="
                />
                {/*<img
                  className='w-4 h-4'
                  onClick={() => editColaborator(subitem.id)}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEEklEQVR4nO2bSYgUVxjHfzPtuBt1cEEdTfAwgnoybsxBZPAQF1AGB0UFVxAUFRcMYg4qogfRy6AiIREUUQzERBGX0UuMggtuuK+oiaJExcg40XZsD9+U71XbU1Wt/VVZnf5BQdP9r57//1VNvfe+9xoKFChQoECB/y2JqA140AooA94AyYi9hEYJsAS4BqQaj3fAGWAqUBSdNX06A6cxwTMdB4HWURnUJAH8iXd459gTkUdV5hIsvHOMjsamDu2BJ2TXAL9G4lSJtWQXPgXcj8SpAh2BV2TfAM9yZaA4V1/0ibQEmn/CeY9yZSDqBngETAAeZnneEQUvkdIWWAPU43/7J4HyaGzq0xPYhncDbIzMXY5oBxwALgMDm9BUAhf5OPxzZMQYa9ZjAm320DUD5gD/WPpF6u6UKQdeYwJVBTinFFiGhI/6of3Z7MeEP0aez+7SGYEJ3wB8G62dcCkBrmAaYIuPfghwA+nv2+haC4cFBH+SlyA9hKMfpe5OmU7I2N0JtNBHP9/Svmg8P9ZswgS6ilzhpijF3e0tVnenTF9k6OoEGumj32xpbwItVN2FwCFMoH0+2n64Gyv2VZ8qTJjXQB8f/WFLX6trTZ/mSDfmBFrnox9vaZPI3RBrlmECPUbqfk3RErhj6Teou1OmK9J9OYFm+eh/sLRPkZ4g1mzFBDqL9/JbD+ClpZ+t7k6ZAcg43wk0zEe/3dJeQqbAsaUI+AMTaKePfiiy7ufoh6u6C4HJmDCvgK89tEXASUu/W92dMq2Ae5hAK3z00yxtPfCNqrsQWIkJ9ADvKWxb4G9Lv0rdnTJlQB0m0EQfvb0U9hd5MN/fhQl0HO8yV2/ctf/J6u6UqcA8yRuAQT763zDhTxDzmmAxcAoT6EcffaWlbQAGq7oLgZmYQP8C3Ty0CdwLHT+ru1OmHbKg6QRa4qOfR/DGigV2t3cL78pNR9xlru/V3SlTinu2N9ZHX0PwxooFyzGBTuH9JE8vc41TdxcC1wl+9WstbezLXCDL2Xalx2v6Os7SJoH+6u5CYCnBNip8hXtyVKNvLRz2YUJVe+h+snRPyIMyl8NdTLCyJjSzLU2QyVFsSCBb11PAf2R++o+xNCngl9DchUB3TLA7GT6vxr374zwy988b+mHCnbHeTwCrcRdD7wG9wjaoTQUm4NHG98qRrS72//x18jA8yEYFJ+ReZAKUvs/3KNAlKoPaTMI9n7eDJ5EJ0pf8G6SMZLMQ0cF6bW9XuwTMQH7ukk45MlzO5fa2d8DvyOKrTTFykQB2IBcmp9gLnimku1uJ927v22nn5Oq4leFvTbE+D1xrzOYOuG29PgdMBy5kcf4XSTYNsBsZ/BQjA5y3Ac75DhkJ5rL0XYdUotNxbvsgy3IfeA+10KdH2qoQhAAAAABJRU5ErkJggg=="
        />*/}
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