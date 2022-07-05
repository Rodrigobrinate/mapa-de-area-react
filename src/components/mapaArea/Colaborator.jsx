import {Accordion, ListGroup, Alert} from 'react-bootstrap';
import MapContext from '../../pages/mapa_area/MapContext';
import { useContext } from 'react';



export default function Colaborator(props){
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
                        </div>
                        
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
                        </div>
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
                        </div>
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
                      </div>
                    </div>
                      
                    </ListGroup.Item>
                  </ListGroup> 
                
              );
              }
             
             }     
    
  
)
)


}