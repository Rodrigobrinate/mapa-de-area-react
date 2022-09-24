import { useEffect } from "react";
import { useState } from "react";
import api from "../../../components/api";
import Header from "../../../components/Header";
import { Table, Modal, Button, Alert } from "react-bootstrap";
import { Loader } from 'https://cdn.pika.dev/google-maps';
//import cordenadas from "./cordenadas"



            export default function AdmUsers(){
                const [department, setDepartment] = useState(1)
                const [departments, setDepartments] = useState([])
                const [users, setUsers]  = useState([])
                const [name, setName] = useState('')
                const [email, setEmail] = useState('')
                const [password, setPassword] = useState('')
                const [id, setId] = useState(0)
                const [msg, setMsg] = useState('')
                const [userDepartment, setUserDepartment] = useState(1)

                const [ editModal, setEditmodal] = useState([])
                
                const headers = {
                    headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                    }
                }
                useEffect( async ()=> {
                    const options = {/* todo */};
                    const loader = new Loader(process.env.REACT_APP_API_KEY_MAPS, options);
 
                    const google = await loader.load();
                    const map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: -20.6474015, lng: -41.9085062},
                        zoom: 8,
                    });
                   /* console.log(cordenadas())
                    const a = cordenadas()


                    console.time()
                    for(let i = 0; i < a.length; i++){
                      new google.maps.Marker({
                        position: {
                           lat: a[i].lat*1, lng: a[i].lng*1
                        },
                        map: map, 
                      });
                    }
                    console.timeEnd()

                    console.time()
                  cordenadas().map((item) => {

                    //console.log(item.lat, item.lng)
                     new google.maps.Marker({
                        position: {
                           lat: item.lat*1, lng: item.lng*1
                        },
                        map: map, 
                      });
                   })
                   console.timeEnd()

                   console.time()
                   cordenadas().forEach((item) => {
 
                     //console.log(item.lat, item.lng)
                      new google.maps.Marker({
                         position: {
                            lat: item.lat*1, lng: item.lng*1
                         },
                         map: map, 
                       });
                    })
                    console.timeEnd()

                    console.time()
                    let i = 1
                    while(i<a.length){
                      new google.maps.Marker({
                        position: {
                           lat: a[i].lat*1, lng: a[i].lng*1
                        },
                        map: map, 
                      });
                      i++
                    }
                    console.timeEnd()*/


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
                    }).catch((err)=> {
                      if (err.response.status == 401){
                        window.location.href = "/login"
                      }
                    })

                    api.get("/departments", headers).then((response) => {
                      console.log(response.data.departments)
                      setDepartments(response.data.departments)
                    })



                },[department])


                


                function update(e, _name, _email, _id){
                  setMsg(<Alert  variant="success" >alerando...</Alert>);
                  setUserDepartment(e.target.value);
                   setName(name); 
                   setEmail(email);
                   setId(_id)
                   setUserDepartment(e.target.value)

                  api.post("/users/update",{
                    id: _id ,
                    name: _name,
                    email: _email,
                    password: password,
                    department_id: parseInt(e.target.value),
                   
                  },headers).then((response)=> {
                    setUsers([])
                    setDepartments([])       
                    
                    setMsg(<Alert  variant="success" >{response.data.msg}</Alert>);
                     api.get("/departments", headers).then((response) => {
                      setDepartments([])
                      console.log(response.data.departments)
                      setDepartments(response.data.departments)
                    })
                    api.get("/users/"+department,headers).then((response)=> {
                      setUsers([])
                      setUsers(response.data.users)
                  }).catch((err)=> {
                    if (err.response.status == 401){
                      window.location.href = "/login"
                    }
                  }) 
                 
                  modalClose()
                 
                }).catch((err)=> {
                  setMsg(<Alert  variant="danger" >{err.response.data.msg}</Alert>)
                  if (err.response.status == 401){
                    window.location.href = "/login"
                  }
                })
                }

                function modalEdit(_name, _email, id){
                  setName(_name)
                  setEmail(_email)
                  setId(id)
                    
                  document.getElementById("modal").classList.remove("d-none")

                    }

                    function modalClose(){
                      document.getElementById("modal").classList.add("d-none")
                    }

        


                return (
                    <>
                    <Header />
                    <div className="w-4/5 mx-auto">
                    <span>selecione o setor</span>
                    <select name="" className=" w-36 px-2 py-2 " id="" onChange={(e)=> {setDepartment(e.target.value)}}>
                      {departments.map((item, index)=> {
                        return (
                        <option  key={index} value={item.id}>{item.name}</option>)
                      })
                    }
                       

                    </select>
</div>

<div id="mapp" className=" w-scree h-scree"></div>

{msg}

<Modal.Dialog className="absolute w-4/5 mx-auto d-none shadow-md " id="modal" style={{right: "20vw", position: "absolute", width: "60vw", maxWidth: "80vw"}}>
                        <Modal.Header >
                          <Modal.Title>Editar</Modal.Title>
                        </Modal.Header>

                        <Modal.Body className="flex justify-around">
                          <span>nome</span>
                          <input type="text"  value={name} onChange={(e)=> {setName(e.target.value)}} />
                          <span>email</span>
                          <input type="text" value={email} onChange={(e)=> {setEmail(e.target.value)}} />
                          <span>senha</span>
                          <input type="text" value={password} onChange={(e)=> {setPassword(e.target.value)}} />
                        </Modal.Body>

                        <Modal.Footer>
                          <Button variant="secondary" onClick={modalClose}>Fechar</Button>
                          <Button variant="primary" value={department} onClick={(e)=> {update(e, name, email, id) }}>salvar</Button>
                        </Modal.Footer>
                      </Modal.Dialog>

<Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Departamento</th>
          <th>editar</th>

          <th>apagar</th>
        </tr>
      </thead>
      <tbody>

        {users.map((item)=> {

        return (
        <tr>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>
            <select className="p-2 p-2" name="" id="" onChange={(e)=>{  update(e, item.name, item.email, item.id) }}  >
            {departments.map((_department, index)=> {
              if (_department.id == department){
                return (
                  <option  key={index} selected value={_department.id}>{_department.name}</option>)
              }else{
                return (
                  <option  key={index}  value={_department.id}>{_department.name}</option>)
              }
                        
                      })}
                </select> 
            </td>

          <td><button className="btn btn-warning"  onClick={() => { modalEdit(item.name, item.email, item.id) } }>editar</button></td>
          <td><button className="btn btn-danger">apagar</button></td> </tr>)
        
            
        })}
        
       
      </tbody>
    </Table>
                    
                    </>
                )
            }