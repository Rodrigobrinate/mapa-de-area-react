import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [city, setCity] = useState([])
   
  useEffect(() => {
    axios.get("http://187.94.218.212:6868/").then((response) => setCity(
      


        response.data.map((subArray) => {
          return (
            
           <li className='li1'>{subArray.name}
            <li>{
              subArray.colaborator_in_city.map((subitem, i) => {
                return (
                  <li className='li2'>{subitem.colaborator.name}<div><p>{subitem.type}</p><p>{subitem.periodo}</p></div></li>
                );
              })
        
            }</li>
        </li>
     

      )})))

  }, []);




  function deleteColeborator(id){

    axios.post("http://187.94.218.212:6868/delete ",{
      id: id,
      
      
    } ).then((response) => {console.log(response.data)})
    
  }
  function search(item){
    
    axios.post("http://187.94.218.212:6868/search",{
      date: document.getElementById('date').value,
      
      
    }  ).then((response) => setCity(
      


        response.data.map((subArray) => {
          return (
            
           <li className='li1'>{subArray.name}
            <li>{
              subArray.colaborator_in_city.map((subitem, i) => {
                if (localStorage.getItem('token') !== null) {
                  return (
                    <li className='li2'><p className='name'>{subitem.colaborator.name}</p><div><p>{subitem.type}</p><p>{subitem.periodo}</p>
                    
                    </div> <img width="15px" onClick={()=> deleteColeborator(subitem.id)} height="15px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUVJREFUSEvFlesxBEEURs9mQARkgAiQARkQAZkQAhGQARkgAjYDGVBnqnvrutNbOz1bW/rXPLq/x331gh2vxY7xWUdwBdwAxxMFvAP3wGPenwn2gJcO4Iwn0TnwXX9kAjccAUvgFvD9a4OLwyJIBwflzEmLQMC7Am5oViomhkn3CpLkGnjwXHRQ1V8CzxNB87YL4Cm6iAQ/Zfd+Uu+h14YjFZ8lMYbrs+AM2C2C+C0qismLxZAdV6GTCARSvYmvFaKwWmkfxUXMVxeBYJnEbxZBC9x/3QSZxPd14FsRxAYcNVQop24HMaEqd8Wc5H7pIsjglqUrJ352kmuZ5pjHxG9VpqrdaaP1TozoeBj1mzq5h8CwvQGOi+aw+5P9DmQBrSrHtc/ma3VRtRx0YI+2jhowElh6pzPRBdbBcAfE9W+X/kwj42O/dzthGS5ZnbUAAAAASUVORK5CYII="/></li>
                  );
                }
                else {
                  return (
                    <li className='li2'><p className='name'>{subitem.colaborator.name}</p><div><p>{subitem.type}</p><p>{subitem.periodo}</p>
                    
                    </div> </li>
                  );
                }
                return (
                  <li className='li2'><p className='name'>{subitem.colaborator.name}</p><div><p>{subitem.type}</p><p>{subitem.periodo}</p>
                  
                  </div> <img width="15px" onClick={()=> deleteColeborator(subitem.id)} height="15px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUVJREFUSEvFlesxBEEURs9mQARkgAiQARkQAZkQAhGQARkgAjYDGVBnqnvrutNbOz1bW/rXPLq/x331gh2vxY7xWUdwBdwAxxMFvAP3wGPenwn2gJcO4Iwn0TnwXX9kAjccAUvgFvD9a4OLwyJIBwflzEmLQMC7Am5oViomhkn3CpLkGnjwXHRQ1V8CzxNB87YL4Cm6iAQ/Zfd+Uu+h14YjFZ8lMYbrs+AM2C2C+C0qismLxZAdV6GTCARSvYmvFaKwWmkfxUXMVxeBYJnEbxZBC9x/3QSZxPd14FsRxAYcNVQop24HMaEqd8Wc5H7pIsjglqUrJ352kmuZ5pjHxG9VpqrdaaP1TozoeBj1mzq5h8CwvQGOi+aw+5P9DmQBrSrHtc/ma3VRtRx0YI+2jhowElh6pzPRBdbBcAfE9W+X/kwj42O/dzthGS5ZnbUAAAAASUVORK5CYII="/></li>
                );
              })
        
            }</li>
        </li>
     

      )})))
  }


  return (
    <div className="App">
      <input type="date" id="date" className='date' onChange={search} />
      <ul>
     {city}
     </ul>
    </div>
  );
}

export default App;
