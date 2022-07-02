import api from "../../components/api"
import { useState } from "react"
import { Alert } from "react-bootstrap"




                export default function CreateEscala(){
                    const [msg , setMsg] = useState('')

                    const headers = {
                        headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('token')
                        }
                    }
                    function create(){
                        const time = document.getElementById('time').value
                        const month = document.getElementById('month').value
                        api.post('/createescala',{
                            time: time,
                            month: month
                        }, headers).then((response) => {
                            if (response.st == 1){
                                setMsg(<Alert  variant="success" >{response.data.msg}</Alert>)
                            }else{
                                setMsg(<Alert  variant="danger" >{response.data.msg}</Alert>)
                            }
                            
                        })
                    }
                    return (
                        <>
                        <form>
                            <span>selecione o mes</span>
                            <select id='month'>
                                <option>selecione o mes</option>
                                <option value={1}>Janeiro</option>
                                <option value={2}>fevereiro</option>
                                <option value={3}>março</option>
                                <option value={4}>abril</option>
                                <option value={5}>maio</option>
                                <option value={6}>junho</option>                             
                                <option value={7}>julho</option>
                                <option value={8}>agosto</option>
                                <option value={9}>setembro</option>
                                <option value={10}>outubro</option>
                                <option value={11}>novembro</option>
                                <option value={12}>dezembro</option>
                            </select>

                            <span>selecione o horário padrão</span>
                            <select  id="time" className='w-max text-xs  py-3 px-4' >
                    <option value="1" className='bg-red-700'>07:00 as 13:20</option>
                    <option value="2" className='bg-red-500 '>07:30 as 13:30</option>
                    <option value="3" className='bg-orange-600'>08:00 - 14:30</option>
                    <option value="4" className='bg-yellow-200'>12:00 - 18:30</option>
                    <option value="5" className='bg-green-300'>14:00 - 20:30</option>
                    <option value="5" className='bg-red-600'>Férias</option>
                    <option value="5" className='bg-gray-500'>Folga</option>
                    <option selected="selected" className='bg-blue-500' value={6}>16:30 - 23:00</option>
                </select>

                        <button type="button" onClick={create} className="btn btn-primary w-max ml-auto mr-auto">create</button>
                        </form>
                        
                        
                        </>
                    )
                }