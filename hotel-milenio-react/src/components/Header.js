import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  

  return (
    <div>
      {/* Navbar principal */}
      <Navbar className="navbar-color" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home">Hotel Nuevo Milenio</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ display: 'none' }}
            className="d-sm-none d-xs-none"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              <Nav.Link>
                <Link to="/" className="link-unstyled">Inicio</Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/about" className="link-unstyled">Información</Link>
              </Nav.Link>

              

              <NavDropdown title="Clientes" id="clientes">
                <NavDropdown.Item>
                  <Link to="/Cliente" className="link-unstyled">Registrar Cliente</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-cliente" className="link-unstyled">Listar Clientes</Link>
                </NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="Empleado" id="Empleado">
                <NavDropdown.Item>
                  <Link to="/Empleado" className="link-unstyled">Registrar Empleado</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/actualizar-Empleado" className="link-unstyled">Listar Empleado</Link>
                </NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="ReservaciónEstancia" id="ReservaciónEstancia">
                <NavDropdown.Item>
                  <Link to="/ReservacionEstancia" className="link-unstyled">Registrar ReservaciónEstancia</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/ListadoReservacionEstancia" className="link-unstyled">Listar ReservaciónEstancia</Link>
                </NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="Habitación" id="Habitación">
              <NavDropdown.Item>
                  <Link to="/Habitacion" className="link-unstyled">Registrar Habitación</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/ListarHabitacion" className="link-unstyled">Listar Habitación</Link>
                </NavDropdown.Item>
              </NavDropdown>



              <NavDropdown title="Servicios" id="Servicios">
              <NavDropdown.Item>
                <Link to="/Servicios" className="link-unstyled">Registrar Servicios</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/ListarServicios" className="link-unstyled">Listar Servicios</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Reportes" id="Reportes">
              <NavDropdown.Item>
                <Link to="/Reportes" className="link-unstyled">Registrar Reportes</Link>
              </NavDropdown.Item>    
              
              

            </NavDropdown>
            <Nav.Link>
                <Link to="/" className="link-unstyled">Cerrar Sesión</Link>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-light"
            onClick={toggleMenu}
            className="d-md-none d-block"
            aria-controls="basic-navbar-nav"
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Menú
          </Button>
        </Container>
      </Navbar>

      {/* Menú lateral (Offcanvas) */}
      <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">

            <Nav.Link>
              <Link to="/" className="link-unstyled">Inicio</Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/about" className="link-unstyled">About</Link>
            </Nav.Link>

            <NavDropdown title="Clientes" id="clientes">
              <NavDropdown.Item>
                <Link to="/Cliente" className="link-unstyled">Registrar Cliente</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/actualizar-cliente" className="link-unstyled">Listar Clientes</Link>
              </NavDropdown.Item>
            </NavDropdown>


            <NavDropdown title="Empleado" id="Empleado">
              <NavDropdown.Item>
                <Link to="/Empleado" className="link-unstyled">Registrar Empleado</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/actualizar-Empleado" className="link-unstyled">Listar Empleado</Link>
              </NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown title="ReservaciónEstancia" id="ReservaciónEstancia">
                <NavDropdown.Item>
                  <Link to="/ReservacionEstancia" className="link-unstyled">Registrar ReservaciónEstancia</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/ListadoReservacionEstancia" className="link-unstyled">Listar ReservaciónEstancia</Link>
                </NavDropdown.Item>
              </NavDropdown>

            <NavDropdown title="Habitación" id="Habitación">
              

              <NavDropdown.Item>
                <Link to="/ListarHabitacion" className="link-unstyled">Listar Habitación</Link>
              </NavDropdown.Item>
            </NavDropdown>
            



            <NavDropdown title="Servicios" id="Servicios">
              <NavDropdown.Item>
                <Link to="/Servicios" className="link-unstyled">Registrar Servicios</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/ListarServicios" className="link-unstyled">Listar Servicios</Link>
              </NavDropdown.Item>
            
            </NavDropdown>
            

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Header;