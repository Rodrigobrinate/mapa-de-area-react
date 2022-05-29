import react, {useState, useEffect} from 'react';
import { Nav, Navbar,Container, NavDropdown} from 'react-bootstrap';
import '../pages/styles/Header.css'



 export default function Header() {
     const [login, setLogin] = useState([]);
     useEffect(() => {
setLogin( 
    <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
            olá: <a href="/login">login</a>
         </Navbar.Text>
      </Navbar.Collapse>)
        


if (localStorage.getItem('token')) {
   return setLogin(<Navbar.Collapse className="justify-content-end">
              
      
  <Navbar.Text>
    olá: <a href="/login">{localStorage.getItem('name')}</a>
  </Navbar.Text> </Navbar.Collapse> )
}
}, []);

     return(
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Acesse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/massive">Massiva</Nav.Link>
              <Nav.Link href="/">mapa de area </Nav.Link>
              <Nav.Link href="/pause">Pausa </Nav.Link>
              <NavDropdown title="administração" id="basic-nav-dropdown">
                <NavDropdown.Item href="/createMassive">adicionar massiva</NavDropdown.Item>
                <NavDropdown.Item href="/create">adicionar técnico</NavDropdown.Item>
                <NavDropdown.Item href="/register">adicionar usuário</NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
          </Navbar.Collapse>
          {login}
          
        </Container>
      </Navbar>
     )
 }