//import './styles/Create.css'
import React,{ useState, useEffect,useRef } from 'react';
import { Link} from 'react-router-dom';
import Header from '../../components/Header';
import { Editor } from '@tinymce/tinymce-react';
import api from "../../components/api";
import {Form, Button } from 'react-bootstrap'

function Create() {
    const [colaborator, setColaborator] = useState([])
    const [city, setCity] = useState([])
    const [msg, setMsg] = useState('')
    

const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      return editorRef.current.getContent();
    }
  };


if (localStorage.getItem('token') === null) {
    window.location.href = '/login'
    }
    const headers = {
      headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
      }
  }

    useEffect(() => { 
        api.get("/colaborator", headers)
        .then((response) => setColaborator(response.data))
    }, []);


    useEffect(() => { 
        api.get("/city", headers).then((response) => setCity(response.data))
    }, []);

    function create(item){
        api.post("/createMassive",{
            city: document.getElementById('city').value,
            returndate: document.getElementById('return_date').value,
            date: document.getElementById('init_date').value,
            type: document.getElementById('type').value,
            description: log()
        },headers).then((response) => {
            if(response.date.auth === false){
                window.location.href = '/login'
            }else if (response.data.status === 'error'){
                setMsg(response.data.msg)
            }else if (response.data.status === 'success'){
                setMsg('Cadastrado com sucesso')
            }
        })
    }

    
  return (
    <div className="AppCreate">
        <Header />
        
     <form >

    
     <Editor id="description"
        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
         <span>cidade</span>
         <Form.Select id="city" className='mb-2'>
            <option>selecione a cidade</option>
            {city.map((item)=> <option value={item.id}>{item.name}</option>)}
            
         </Form.Select  >
         
         <span>tipo de massiva</span>
         <Form.Select id='type' aria-label="Default select example">
         <option>selecione o tipo de massiva</option>
             <option value="queda">queda</option>
        </Form.Select>
         
            <span>data de inico</span>
            <Form.Control id='init_date' type="datetime-local" />
            <span>previsão de conclusão</span>
            <Form.Control id='return_date' type="datetime-local" />
            <Button variant="success" type='button' onClick={create} className="submit" >cadastrar</Button>
         
     </form>
    </div>
  );
}

export default Create;
