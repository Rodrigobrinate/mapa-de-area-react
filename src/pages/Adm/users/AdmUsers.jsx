import { useEffect } from "react";
import { useState } from "react";
import api from "../../../components/api";
import Header from "../../../components/Header";
import { Table } from "react-bootstrap";
import { Loader } from 'https://cdn.pika.dev/google-maps';
//import cordenadas from "./cordenadas"



            export default function AdmUsers(){
                const [department, setDepartment] = useState(1)
                const [users, setUsers]  = useState([])
                
                const headers = {
                    headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                    }
                }
                useEffect( async ()=> {
                    const options = {/* todo */};
                    const loader = new Loader('AIzaSyDkbaD-GrQWw62XxmJgk3MwumDaRCBLvLc', options);
 
                    const google = await loader.load();
                    const map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: -20.6474015, lng: -41.9085062},
                        zoom: 8,
                    });
                    console.log(cordenadas())

                 /*  cordenadas().map((item) => {

                    console.log(item.lat, item.lng)
                     new google.maps.Marker({
                        position: {
                           lat: item.lat*1, lng: item.lng*1
                        },
                        map: map, 
                      });
                   })
*/
                    const marker = new google.maps.Marker({
                        position: {
                           lat: -20.652308720272057, lng: -41.90777107919671
                        },
                        map: map,
                      });
                }, [])

                useEffect(()=> {
                    api.get("/users/"+department,headers).then((response)=> {
                        setUsers(response.data.users)
                    })
                },[department])
   

        


                return (
                    <>
                    <Header />
                    <div className="w-4/5 mx-auto">
                    <span>selecione o setor</span>
                    <select name="" className=" w-36 px-2 py-2 " id="" onChange={(e)=> {setDepartment(e.target.value)}}>
                        <option selected value="1">call center</option>
                        <option value="2">tecnicos</option>
                        <option value="3">lojas</option>
                        <option value="4">backoffice</option>
                        <option value="4">CGR</option>
                    </select>
</div>

<div id="mapp" className=""></div>


<Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Departamento</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>

        {users.map((item)=> {

switch (item.department) {
    case "1":
        return (
        <tr>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>
            <select className="p-2 p-2" name="" id="">
                <option value=""  selected>call center</option>
                <option value=""  >tecnico</option>
                </select> 
            </td>
          <td><button className="btn btn-danger">remover</button></td>
        </tr>)
        break;
        case '2':
        return (
        <tr>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>tecnico</td>
          <td>@mdo</td>
        </tr>)
        break;
        case '3':
        return (
        <tr>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>backoffice</td>
          <td>@mdo</td>
        </tr>)
        break;
        case '4':
        return (
        <tr>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td> CGR</td>
          <td>@mdo</td>
        </tr>)
        break;
  
    default:
        break;
  }
            
        })}
        
       
      </tbody>
    </Table>
                    
                    </>
                )
            }