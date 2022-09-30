import { useEffect } from "react";
import { useState } from "react";
import api from "../../../components/api";
import Header from "../../../components/Header";
import { Table, Modal, Button, Alert } from "react-bootstrap";


export default function AdmUsers() {
  const [department, setDepartment] = useState(1)
  const [departments, setDepartments] = useState([])
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState(0)
  const [msg, setMsg] = useState('')
  const [userDepartment, setUserDepartment] = useState(1)

  const [editModal, setEditmodal] = useState([])

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  }

  useEffect(() => {
    
    api.get("/departments", headers).then((response) => {
      setDepartment(response.data.response[0].id)
      console.log(response.data.response[0].id, department)
      setDepartments(response.data.response)

      api.get("/users/" + response.data.response[0].id, headers).then((response) => {
        setUsers(response.data.response)
      }).catch((err) => {
        if (err.response.status == 401) {
          window.location.href = "/login"
        }
      })
    })
  }, [])
  function update(e, _name, _email, _id) {
    setMsg(<Alert variant="success" >alerando...</Alert>);
    setUserDepartment(e.target.value);
    setName(name);
    setEmail(email);
    setId(_id)
    setUserDepartment(e.target.value)
    api.post("/users/update", {
      id: _id,
      name: _name,
      email: _email,
      password: password,
      department_id: parseInt(e.target.value),
    }, headers).then((response) => {
     // setUsers([])
      setDepartments([])
      setMsg(<Alert variant="success" >{response.data.msg}</Alert>);
      api.get("/departments", headers).then((response) => {
        setDepartments([])
        setDepartments(response.data.response)
      })
      api.get("/users/" + department, headers).then((response) => {
        setUsers([])
        setUsers(response.data.response)
      }).catch((err) => {
        if (err.response.status == 401) {
          window.location.href = "/login"
        }
      })
      modalClose()
    }).catch((err) => {
      setMsg(<Alert variant="danger" >{err.response.data.msg}</Alert>)
      if (err.response.status == 401) {
        window.location.href = "/login"
      }
    })
  }

  function modalEdit(_name, _email, id) {
    setName(_name)
    setEmail(_email)
    setId(id)
    document.getElementById("modal").classList.remove("d-none")
  }

  function modalClose() {
    document.getElementById("modal").classList.add("d-none")
  }

function setdepartment(e){{ 
  
  setDepartment(e.target.value)
  api.get("/users/" + e.target.value, headers).then((response) => {
    setUsers([])
    setUsers(response.data.response)
  }).catch((err) => {
    if (err.response.status == 401) {
      window.location.href = "/login"
    }
  })
}}

function deleteUser(id){
  api.get("/user/delete/"+id, headers).then((response) => {
    
    api.get("/users/" + department, headers).then((response) => {
      setUsers([])
      setUsers(response.data.response)
    })

    console.log(response.data)
  })
}

  return (
    <>
      <Header />
      <div className="w-4/5 mx-auto">
        <span>selecione o setor</span>
        <select name="" className=" w-36 px-2 py-2 " id="" onChange={(e) => { setdepartment(e) }}>
          {departments.map((item, index) => {
            return (
              <option key={index} value={item.id}>{item.name}</option>)
          })
          }


        </select>
      </div>

      <div id="mapp" className=" w-scree h-scree"></div>

      {msg}

      <Modal.Dialog className="absolute w-4/5 mx-auto d-none shadow-md " id="modal" style={{ right: "20vw", position: "absolute", width: "60vw", maxWidth: "80vw" }}>
        <Modal.Header >
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>

        <Modal.Body className="flex justify-around">
          <span>nome</span>
          <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
          <span>email</span>
          <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <span>senha</span>
          <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>Fechar</Button>
          <Button variant="primary" value={department} onClick={(e) => { update(e, name, email, id) }}>salvar</Button>
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

          {users.map((item) => {

            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <select className="p-2 p-2" name="" id="" onChange={(e) => { update(e, item.name, item.email, item.id) }}  >
                    {departments.map((_department, index) => {
                      if (_department.id == department) {
                        return (
                          <option key={index} selected value={_department.id}>{_department.name}</option>)
                      } else {
                        return (
                          <option key={index} value={_department.id}>{_department.name}</option>)
                      }

                    })}
                  </select>
                </td>

                <td><button className="btn btn-warning" onClick={() => { modalEdit(item.name, item.email, item.id) }}>editar</button></td>
                <td><button className="btn btn-danger" onClick={() =>{ deleteUser(item.id)}} >apagar</button></td> </tr>)


          })}


        </tbody>
      </Table>

    </>
  )
}