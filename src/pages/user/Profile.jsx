import { useState } from "react"
import api from "../../components/api"
import Header from "../../components/Header"
import { Alert } from "react-bootstrap"


    export default function Profile(){
        const [name, setName] = useState(localStorage.getItem("name"))
        const [email, setEmail] = useState(localStorage.getItem("email"))
        const [password, setPassword] = useState('')
        const [msg, setMsg] = useState('')


        const headers = {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem('token')
            }
          }

        function update(e){
            e.preventDefault()

        api.post("/user/update",{
            name: name,
            email: email,
            password: password
        },headers).then((response) => {
            localStorage.setItem('name', response.data.response.name)
            localStorage.setItem('email', response.data.response.email)
            console.log(response.data)
            setName(response.data.response.name)
            setEmail(response.data.response.email)
            setMsg(<Alert variant="success" >{response.data.msg}</Alert>)
            setTimeout(() => {
                setMsg()
            }, 3000);
        })
}
        return (
            <>
            <Header />
            <h1 className="text-center">{name}</h1>
            {msg}

            <form onSubmit={update} className="flex flex-col justify-center w-2/5">
                <span>nome</span>
                
                <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} name="" id="" />
                <span>email</span>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} name="" id="" />
                <span>password</span>
                <input type="password" autoComplete="new-password" value={password} onChange={(e) => {setPassword(e.target.value)}} name="" id="" />
                <button className="btn btn-primary mt-2" type="submit">salvar</button>
            </form>
            </>
        )
    }