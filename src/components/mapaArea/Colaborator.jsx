import {Accordion, ListGroup, Alert} from 'react-bootstrap';
import MapContext from '../../pages/MapContext';
import { useContext } from 'react';



export default function City(props){
  const {data} = props

  const {deleteColeborator, setMsg} = useContext(MapContext)
    



 return ( data.user_in_city.map((subitem, i) => {

    
             if(subitem.type == 1 && subitem.periodo == 1){
                return ( 
                  <ListGroup>
                    <ListGroup.Item className="w-100 d-flex justify-between mt-3">
                      <p className='text-xs p-1'>{subitem.user.name}</p>
                      <div className='h-2/5 d-flex justify-between'>  
                        
                          <div>
                        <p className='text-xs mb-1'>Manutenção</p>
                        <p className='text-xs mb-1'>08:00 as 18:00</p>
                        </div><img 
                          className='delete'
                          width="15px" 
                          onClick={()=> deleteColeborator(subitem.id)} height="15px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUVJREFUSEvFlesxBEEURs9mQARkgAiQARkQAZkQAhGQARkgAjYDGVBnqnvrutNbOz1bW/rXPLq/x331gh2vxY7xWUdwBdwAxxMFvAP3wGPenwn2gJcO4Iwn0TnwXX9kAjccAUvgFvD9a4OLwyJIBwflzEmLQMC7Am5oViomhkn3CpLkGnjwXHRQ1V8CzxNB87YL4Cm6iAQ/Zfd+Uu+h14YjFZ8lMYbrs+AM2C2C+C0qismLxZAdV6GTCARSvYmvFaKwWmkfxUXMVxeBYJnEbxZBC9x/3QSZxPd14FsRxAYcNVQop24HMaEqd8Wc5H7pIsjglqUrJ352kmuZ5pjHxG9VpqrdaaP1TozoeBj1mzq5h8CwvQGOi+aw+5P9DmQBrSrHtc/ma3VRtRx0YI+2jhowElh6pzPRBdbBcAfE9W+X/kwj42O/dzthGS5ZnbUAAAAASUVORK5CYII="
                          />
                      </div>
                      
                    </ListGroup.Item>
                  </ListGroup> 
                );
             }
              else if(subitem.type == 1 && subitem.periodo == 2){
                return ( 
                  <ListGroup>
                    <ListGroup.Item className="w-100 d-flex justify-between mt-3">
                      <p className='text-xs p-1'>{subitem.user.name}</p>
                      <div className='h-2/5 d-flex justify-between'>  
                        
                          <div>
                        <p className='text-xs mb-1'>Manutenção</p>
                        <p className='text-xs mb-1'>13:00 as 21:00</p>
                        </div><img 
                          className='delete'
                          width="15px" 
                          onClick={()=> deleteColeborator(subitem.id)} height="15px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUVJREFUSEvFlesxBEEURs9mQARkgAiQARkQAZkQAhGQARkgAjYDGVBnqnvrutNbOz1bW/rXPLq/x331gh2vxY7xWUdwBdwAxxMFvAP3wGPenwn2gJcO4Iwn0TnwXX9kAjccAUvgFvD9a4OLwyJIBwflzEmLQMC7Am5oViomhkn3CpLkGnjwXHRQ1V8CzxNB87YL4Cm6iAQ/Zfd+Uu+h14YjFZ8lMYbrs+AM2C2C+C0qismLxZAdV6GTCARSvYmvFaKwWmkfxUXMVxeBYJnEbxZBC9x/3QSZxPd14FsRxAYcNVQop24HMaEqd8Wc5H7pIsjglqUrJ352kmuZ5pjHxG9VpqrdaaP1TozoeBj1mzq5h8CwvQGOi+aw+5P9DmQBrSrHtc/ma3VRtRx0YI+2jhowElh6pzPRBdbBcAfE9W+X/kwj42O/dzthGS5ZnbUAAAAASUVORK5CYII="
                          />
                      </div>
                      
                    </ListGroup.Item>
                  </ListGroup> 
                );
              }
              
             else if (subitem.type == 2 && subitem.periodo == 2){
                return ( 
    
                  <ListGroup>
                    <ListGroup.Item className="w-100 d-flex justify-between mt-3">
                      <p className='text-xs p-1'>{subitem.user.name}</p>
                      <div className='h-2/5 d-flex justify-between'>  
                        
                          <div>
                        <p className='text-xs mb-1'>Instalação</p>
                        <p className='text-xs mb-1'>13:00 as 21:00</p>
                        </div><img 
                          className='delete'
                          width="15px" 
                          onClick={()=> deleteColeborator(subitem.id)} height="15px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUVJREFUSEvFlesxBEEURs9mQARkgAiQARkQAZkQAhGQARkgAjYDGVBnqnvrutNbOz1bW/rXPLq/x331gh2vxY7xWUdwBdwAxxMFvAP3wGPenwn2gJcO4Iwn0TnwXX9kAjccAUvgFvD9a4OLwyJIBwflzEmLQMC7Am5oViomhkn3CpLkGnjwXHRQ1V8CzxNB87YL4Cm6iAQ/Zfd+Uu+h14YjFZ8lMYbrs+AM2C2C+C0qismLxZAdV6GTCARSvYmvFaKwWmkfxUXMVxeBYJnEbxZBC9x/3QSZxPd14FsRxAYcNVQop24HMaEqd8Wc5H7pIsjglqUrJ352kmuZ5pjHxG9VpqrdaaP1TozoeBj1mzq5h8CwvQGOi+aw+5P9DmQBrSrHtc/ma3VRtRx0YI+2jhowElh6pzPRBdbBcAfE9W+X/kwj42O/dzthGS5ZnbUAAAAASUVORK5CYII="
                          />
                      </div>
                      
                    </ListGroup.Item>
                  </ListGroup> 
                
              );
              }else if(subitem.type == 2 && subitem.periodo == 1){
                return ( 
    
                  <ListGroup>
                    <ListGroup.Item className="w-100 d-flex justify-between mt-3">
                      <p className='text-xs p-1'>{subitem.user.name}</p>
                      <div className='h-2/5 d-flex justify-between'>  
                        
                        <div>
                        <p className='text-xs mb-1'>Instalação</p>
                      <p className='text-xs mb-1'>08:00 as 18:00</p>
                      </div><img 
                        className='delete'
                        width="15px" 
                        onClick={()=> deleteColeborator(subitem.id)} height="15px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUVJREFUSEvFlesxBEEURs9mQARkgAiQARkQAZkQAhGQARkgAjYDGVBnqnvrutNbOz1bW/rXPLq/x331gh2vxY7xWUdwBdwAxxMFvAP3wGPenwn2gJcO4Iwn0TnwXX9kAjccAUvgFvD9a4OLwyJIBwflzEmLQMC7Am5oViomhkn3CpLkGnjwXHRQ1V8CzxNB87YL4Cm6iAQ/Zfd+Uu+h14YjFZ8lMYbrs+AM2C2C+C0qismLxZAdV6GTCARSvYmvFaKwWmkfxUXMVxeBYJnEbxZBC9x/3QSZxPd14FsRxAYcNVQop24HMaEqd8Wc5H7pIsjglqUrJ352kmuZ5pjHxG9VpqrdaaP1TozoeBj1mzq5h8CwvQGOi+aw+5P9DmQBrSrHtc/ma3VRtRx0YI+2jhowElh6pzPRBdbBcAfE9W+X/kwj42O/dzthGS5ZnbUAAAAASUVORK5CYII="
                        />
                    </div>
                      
                    </ListGroup.Item>
                  </ListGroup> 
                
              );
              }
             
             }     
    
  
)
)


}