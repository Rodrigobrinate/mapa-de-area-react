import './styles/Create.css'
import React,{ useState, useEffect,useRef } from 'react';
import { Link} from 'react-router-dom';
import Header from '../components/Header';
import { Editor } from '@tinymce/tinymce-react';
import api from "../components/api";

function Create() {
    const [colaborator, setColaborator] = useState([])
    const [city, setCity] = useState([])
    const [msg, setMsg] = useState('')
    

const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };


if (localStorage.getItem('token') === null) {
    window.location.href = '/login'
    }

    useEffect(() => { 
        api.get("/colaborator")
        .then((response) => setColaborator(response.data))
    }, []);


    useEffect(() => { 
        api.get("/city").then((response) => setCity(response.data))
    }, []);

    function create(item){
        console.log('teste')
        const headers = {
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
            }
        }


        api.post("/createMassive",{
            
            city: document.getElementById('city').value,
            returndate: document.getElementById('return_date').value,
            date: document.getElementById('init_date').value,
            type: document.getElementById('type').value,
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
        <Link className='btn btn-add' to="/"> visualizar</Link>
     <form >

    
     <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue='<p>This is the initial content of the editor.</p>'
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
         <select id="city">
            <option>selecione a cidade</option>
            {city.map((item)=> <option value={item.id}>{item.name}</option>)}
            
         </select  >
         
         <select id="type">
            <option>selecione o tipo de massiva</option>
             <option value="queda">queda</option>
         </select>
         
            <span>data de inico</span>
            <input id='init_date' type="date" />
            <span>previsão de conclusão</span>
            <input id='return_date' type="date" />
            <button type='button' onClick={create} className="submit" >cadastrar</button>
         
     </form>
    </div>
  );
}

export default Create;
