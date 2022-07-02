
import {Table} from 'react-bootstrap'
import api from '../../components/api'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'


export default function EscalaCall() {

    const [data, setData] = useState([])
    const [listday, setListday] = useState([])
    const [month, setMonth] = useState([])


    const headers = {
        headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
        }
    }


function update(e, escala_id, id, day, month){

        api.post('/upescala',{
            user_id: id, escala_id: escala_id, day: day, month: month, time: e.target.value
        }, headers).then((response) =>
            start(month) 
        )

 }

    useEffect(()=> { start(new Date().getMonth()+1)},[])

        function start(id){
     createListDay(id)
    api.get('/escala/'+id, headers).then((response) => 
    
        setData(
            response.data.map((item) => {
                
     return (
        <tr className='d-flex'>
                <td key={item.id} className='absoluted bg-gray-50 w-48 py-4 px-6' style={{backgroundColor: '#fff'}} >{item.name.match(/^[^\s]+/).shift()}</td>
                {item.user_in_work.map((subitem) =>{
                  
                if(subitem.time == 1){ 
                    return <td><select  onChange={(e)=> {update(e,subitem.id, item.id,subitem.day, subitem.month)}} className='w-max text-xs bg-red-700 py-3 px-4' >
                        <option selected="selected" className='bg-red-700' value={subitem.time}>07:00 as 13:20</option>
                        <option value="2" className='bg-red-500 '>07:30 as 13:30</option>
                        <option value="3" className='bg-orange-600'>08:00 - 14:30</option>
                        <option value="4" className='bg-yellow-200'>12:00 - 18:30</option>
                        <option value="5" className='bg-green-300'>14:00 - 20:30</option>
                        <option value="6" className='bg-blue-500'>16:30 - 23:00</option>
                        <option value="7" className='bg-red-600'>Férias</option>
                        <option value="8" className='bg-gray-500'>Folga</option>
                    </select></td>
                }
               else if(subitem.time == 2){
                    return <td><select  onChange={(e)=> {update(e,subitem.id, item.id,subitem.day, subitem.month)}} className='w-max text-xs bg-red-500 py-3 px-4' >
                        <option value="1" className='bg-red-700'>07:00 as 13:20</option>
                        <option selected="selected" className='bg-red-500 ' value={subitem.time} >07:30 as 13:30</option>
                        <option value="3" className='bg-orange-600'>08:00 - 14:30</option>
                        <option value="4" className='bg-yellow-200'>12:00 - 18:30</option>
                        <option value="5" className='bg-green-300'>14:00 - 20:30</option>
                        <option value="6" className='bg-blue-500'>16:30 - 23:00</option>
                        <option value="7" className='bg-red-600'>Férias</option>
                        <option value="8" className='bg-gray-500'>Folga</option>
                    </select></td>
                }
              else if(subitem.time == 3){
                    return <td><select  onChange={(e)=> {update(e,subitem.id, item.id,subitem.day, subitem.month)}} className='w-max text-xs bg-orange-600 py-3 px-4' >
                        <option value="1" className='bg-red-700'>07:00 as 13:20</option>
                        <option value="2" className='bg-red-500 ' >07:30 as 13:30</option>
                        <option selected="selected" className='bg-orange-600' value={subitem.time}>08:00 - 14:30</option>
                        <option value="4" className='bg-yellow-200'>12:00 - 18:30</option>
                        <option value="5" className='bg-green-300'>14:00 - 20:30</option>
                        <option value="6" className='bg-blue-500'>16:30 - 23:00</option>
                        <option value="7" className='bg-red-600'>Férias</option>
                        <option value="8" className='bg-gray-500'>Folga</option>
                    </select></td>
              }
            else if(subitem.time == 4){
                return <td><select  onChange={(e)=> {update(e,subitem.id, item.id,subitem.day, subitem.month)}} className='w-max text-xs bg-yellow-200 py-3 px-4' >
                    <option value="1" className='bg-red-700'>07:00 as 13:20</option>
                    <option value="2" className='bg-red-500 '>07:30 as 13:30</option>
                    <option value="3" className='bg-orange-600'>08:00 - 14:30</option>
                    <option selected="selected" className='bg-yellow-200' value={subitem.time}>12:00 - 18:30</option>
                    <option value="5" className='bg-green-300'>14:00 - 20:30</option>
                    <option value="6" className='bg-blue-500'>16:30 - 23:00</option>
                    <option value="7" className='bg-red-600'>Férias</option>
                    <option value="8" className='bg-gray-500'>Folga</option>
                </select></td>
            }
            else if(subitem.time == 5){
                return <td><select  onChange={(e)=> {update(e,subitem.id, item.id,subitem.day, subitem.month)}} className='w-max text-xs bg-green-300 py-3 px-4' >
                    <option value="1" className='bg-red-700'>07:00 as 13:20</option>
                    <option value="2" className='bg-red-500 '>07:30 as 13:30</option>
                    <option value="3" className='bg-orange-600'>08:00 - 14:30</option>
                    <option value="4" className='bg-yellow-200'>12:00 - 18:30</option>
                    <option selected="selected" className='bg-green-300' value={subitem.time}>14:00 - 20:30</option>
                    <option value="6" className='bg-blue-500'>16:30 - 23:00</option>
                    <option value="7" className='bg-red-600'>Férias</option>
                    <option value="8" className='bg-gray-500'>Folga</option>
                </select></td>
            }
            else if(subitem.time == 6){
                return <td><select  onChange={(e)=> {update(e,subitem.id, item.id,subitem.day, subitem.month)}} className='w-max text-xs bg-blue-500 py-3 px-4' >
                    <option value="1" className='bg-red-700'>07:00 as 13:20</option>
                    <option value="2" className='bg-red-500 '>07:30 as 13:30</option>
                    <option value="3" className='bg-orange-600'>08:00 - 14:30</option>
                    <option value="4" className='bg-yellow-200'>12:00 - 18:30</option>
                    <option value="5" className='bg-green-300'>14:00 - 20:30</option>
                    <option selected="selected" className='bg-blue-500' value={subitem.time}>16:30 - 23:00</option>
                    <option value="7" className='bg-red-600'>Férias</option>
                    <option value="8" className='bg-gray-500'>Folga</option>
                </select></td>
            }
            else if(subitem.time == 7){
                    return <td><select  onChange={(e)=> {update(e,subitem.id, item.id,subitem.day, subitem.month)}} className='w-max text-xs bg-red-600 py-3 px-4' >
                        <option value="1" className='bg-red-700'>07:00 as 13:20</option>
                        <option value="2" className='bg-red-500 '>07:30 as 13:30</option>
                        <option value="3" className='bg-orange-600'>08:00 - 14:30</option>
                        <option value="4" className='bg-yellow-200'>12:00 - 18:30</option>
                        <option value="5" className='bg-green-300'>14:00 - 20:30</option>
                        <option value="6" className='bg-blue-500' >16:30 - 23:00</option>
                        <option selected="selected" value={subitem.time}  className='bg-red-600' >Férias</option>
                        <option value="8" className='bg-gray-500' >Folga</option>
                    </select></td>
            }
            else  if(subitem.time == 8){
                        return <td><select  onChange={(e)=> {update(e,subitem.id, item.id,subitem.day, subitem.month)}} className='w-max text-xs bg-gray-500 py-3 px-4' >
                            <option value="1" className='bg-red-700'>07:00 as 13:20</option>
                            <option value="2" className='bg-red-500 '>07:30 as 13:30</option>
                            <option value="3" className='bg-orange-600'>08:00 - 14:30</option>
                            <option value="4" className='bg-yellow-200'>12:00 - 18:30</option>
                            <option value="5" className='bg-green-300'>14:00 - 20:30</option>
                            <option value="6" className='bg-blue-500' >16:30 - 23:00</option>
                            <option value="7" className='bg-red-600' >Férias</option>
                            <option selected="selected" value={subitem.time} className='bg-gray-500' >Folga</option>
                        </select></td>
                        }
            
            }
                )}
                </tr>
                )}
                )
        )
    )
        }
    


function changeMonth(e){

    start(e.target.value)

}



useEffect(() => {
    console.log('teste')

switch (new Date().getMonth()+1) {
    case 1:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option selected value={1}>Janeiro</option>
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
          )
      break;
    case 2:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option  value={1}>Janeiro</option>
            <option selected value={2}>fevereiro</option>
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
          )
    break;
    case 3:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option  value={1}>Janeiro</option>
            <option value={2}>fevereiro</option>
            <option selected value={3}>março</option>
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
          )
    break;
    case 4:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option  value={1}>Janeiro</option>
            <option value={2}>fevereiro</option>
            <option value={3}>março</option>
            <option selected value={4}>abril</option>
            <option value={5}>maio</option>
            <option value={6}>junho</option>                             
            <option value={7}>julho</option>
            <option value={8}>agosto</option>
            <option value={9}>setembro</option>
            <option value={10}>outubro</option>
            <option value={11}>novembro</option>
            <option value={12}>dezembro</option>
        </select>
          )
    break;
    case 5:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option  value={1}>Janeiro</option>
            <option value={2}>fevereiro</option>
            <option value={3}>março</option>
            <option value={4}>abril</option>
            <option selected value={5}>maio</option>
            <option value={6}>junho</option>                             
            <option value={7}>julho</option>
            <option value={8}>agosto</option>
            <option value={9}>setembro</option>
            <option value={10}>outubro</option>
            <option value={11}>novembro</option>
            <option value={12}>dezembro</option>
        </select>
          )
    break;
    case 6:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option  value={1}>Janeiro</option>
            <option value={2}>fevereiro</option>
            <option value={3}>março</option>
            <option value={4}>abril</option>
            <option value={5}>maio</option>
            <option selected value={6}>junho</option>                             
            <option value={7}>julho</option>
            <option value={8}>agosto</option>
            <option value={9}>setembro</option>
            <option value={10}>outubro</option>
            <option value={11}>novembro</option>
            <option value={12}>dezembro</option>
        </select>
          )
    break;
    case 7:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option  value={1}>Janeiro</option>
            <option value={2}>fevereiro</option>
            <option value={3}>março</option>
            <option value={4}>abril</option>
            <option value={5}>maio</option>
            <option value={6}>junho</option>                             
            <option selected value={7}>julho</option>
            <option value={8}>agosto</option>
            <option value={9}>setembro</option>
            <option value={10}>outubro</option>
            <option value={11}>novembro</option>
            <option value={12}>dezembro</option>
        </select>
          )
    break;
    case 8:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option  value={1}>Janeiro</option>
            <option value={2}>fevereiro</option>
            <option value={3}>março</option>
            <option value={4}>abril</option>
            <option value={5}>maio</option>
            <option value={6}>junho</option>                             
            <option value={7}>julho</option>
            <option selected value={8}>agosto</option>
            <option value={9}>setembro</option>
            <option value={10}>outubro</option>
            <option value={11}>novembro</option>
            <option value={12}>dezembro</option>
        </select>
          )
    break;
    case 9:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option  value={1}>Janeiro</option>
            <option value={2}>fevereiro</option>
            <option value={3}>março</option>
            <option value={4}>abril</option>
            <option value={5}>maio</option>
            <option value={6}>junho</option>                             
            <option value={7}>julho</option>
            <option value={8}>agosto</option>
            <option selected value={9}>setembro</option>
            <option value={10}>outubro</option>
            <option value={11}>novembro</option>
            <option value={12}>dezembro</option>
        </select>
          )
    break;
    case 10:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option  value={1}>Janeiro</option>
            <option value={2}>fevereiro</option>
            <option value={3}>março</option>
            <option value={4}>abril</option>
            <option value={5}>maio</option>
            <option value={6}>junho</option>                             
            <option value={7}>julho</option>
            <option value={8}>agosto</option>
            <option  value={9}>setembro</option>
            <option selected value={10}>outubro</option>
            <option value={11}>novembro</option>
            <option value={12}>dezembro</option>
        </select>
          )
    break;
    case 11:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option  value={1}>Janeiro</option>
            <option value={2}>fevereiro</option>
            <option value={3}>março</option>
            <option value={4}>abril</option>
            <option value={5}>maio</option>
            <option value={6}>junho</option>                             
            <option value={7}>julho</option>
            <option value={8}>agosto</option>
            <option value={9}>setembro</option>
            <option  value={10}>outubro</option>
            <option selected value={11}>novembro</option>
            <option value={12}>dezembro</option>
        </select>
          )
    break;
    case 12:
        setMonth( 
            <select id='month' onChange={(e)=> changeMonth(e)}>
            <option  value={1}>Janeiro</option>
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
            <option selected value={12}>dezembro</option>
        </select>
          )
    break; }
}, [])



    
async function createListDay(month){


 
const option = {
  
        weekday: ('long'), 
  
}
const locale = 'pt-br'
var  a   = await []
for(var i = 1; i < 32; i++){
    await a.push(<th className='d-flex justify-between w-full' style={{width: '148px'}}><p className='d-flex'>{i}</p><p className='d-flex'>  {new Date('2022-'+month+'-'+i).toLocaleDateString(locale, option)}</p></th>)
}

//setTimeout(()=>{
   await setListday(a)
//},500)


}

    return(
        <div> 
            <Header />
            <h1 className='w-max ml-auto mr-auto'>Escala call center</h1>
            <Table striped bordered hover className='overflow-hidden w-4/5'>
  <thead>
    <tr className='d-flex'>
        <th className='w-48'>
       {month}
        </th>
        {listday}
    </tr>
  </thead>
  <tbody>
    {data}
    
  </tbody>
</Table>
        </div>
    )
}