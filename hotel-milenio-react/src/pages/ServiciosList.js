import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';
import './servicios-list.css';


function ServicioList() {
  const [servicio, setservicio] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedServicios, setSelectedServicios] = useState({});
  const [formData, setFormData] = useState({
    NombreServicio: "",
    DescripcionServicio: "",
    NombreEmpleado: ""
    
    
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredServicio = servicio.filter((servicio) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const nombreServicio = servicio.NombreServicio.toLowerCase();
    const descripcionServicio = servicio.DescripcionServicio.toLowerCase();
    const nombreEmpleado = servicio.NombreEmpleado.toLowerCase();
  
    const search = searchQuery.toLowerCase();
  
    // Verifica si la cadena de búsqueda se encuentra en alguno de los campos
    return (
        nombreServicio.includes(search) ||
        descripcionServicio.includes(search) ||
        nombreEmpleado.includes(search) 
    );
  });
  
  

 

  // Función para abrir el modal ys pasar los datos del empleado seleccionado
  const openModal = (servicio) => {
    setSelectedServicios(servicio);

    // Convertir las claves de empleado a minúsculas y asignarlas a formData
    setFormData({
        NombreServicio: servicio.NombreServicio,
        DescripcionServicio: servicio.DescripcionServicio,
    });
    setShowModal(true);
  };



  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadServicios = () => {
    fetch('http://localhost:5000/crud/VerServicios')
      .then((response) => response.json())
      .then((data) => setservicio(data))
      .catch((error) => console.error('Error al obtener los Servicios:', error));
  };


  const handleUpdate = () => {
    console.log('Datos a enviar para actualizar:', formData);
  
    fetch(`http://localhost:5000/crud/updateServicios/${selectedServicios.ID_Servicios}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Actualización exitosa');
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de servicios
          setShowModal(false);
          loadServicios(); // Cargar la lista de servicios actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };
  



  const handleDelete = (idServicios) => {


    console.log("idServicios:", idServicios);
    
    const confirmation = window.confirm('¿Seguro que deseas eliminar este Servicio?');
    if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar el empleado y la Persona
        fetch(`http://localhost:5000/crud/deleteServicio/${idServicios}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                // La eliminación fue exitosa, refresca la lista de Empeado
                loadServicios();
                alert('Servicio eliminado con éxito.');
            } else {
                alert('Error al eliminar el Servicio. Por favor, inténtalo de nuevo más tarde.');
            }
        })
        .catch((error) => {
            console.error('Error al eliminar el Servicio:', error);
            alert('Ocurrió un error al eliminar el Servicio. Por favor, verifica tu conexión a Internet o inténtalo de nuevo más tarde.');
        });
    }
};


  // Realiza una solicitud GET al servidor para obtener los servicios
  useEffect(() => {
    fetch('http://localhost:5000/crud/VerServicios')
      .then((response) => response.json())
      .then((data) => setservicio(data))
      .catch((error) => console.error('Error al obtener los servicios:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Servicio</Card.Title>

          <Row className="mb-3">
            <Col sm="6" md="6" lg="4">
              <FloatingLabel controlId="search" label="Buscar">
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID_Servicios</th>
                <th>Nombre Empleado</th>
                <th>Nombre de Servicio</th>
                <th>Descripcion del Servicio</th>
                <th>Acciones</th>

              </tr>
            </thead>
            <tbody>
              {filteredServicio.map((servicio) => (
                <tr key={servicio.ID_Servicios}>
                  <td>{servicio.ID_Servicios}</td>
                  <td>{servicio.NombreEmpleado}</td>
                  <td>{servicio.NombreServicio}</td>
                  <td>{servicio.DescripcionServicio}</td>
                  <td>
                    <div className="button-container">
                      <Button className="update-button" onClick={() => openModal(servicio)}>
                        Actualizar
                      </Button>
                      <Button className="delete-button" onClick={() => handleDelete(servicio.ID_Servicios)}>
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Servicio</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">


                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="NombreServicio" label="Nombre Servicio">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre Servicio"
                        name="NombreServicio"
                        value={formData.NombreServicio}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>


                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="Descripcion Servicio" label="Descripcion Servicio">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la descripcion del servicio"
                        name="DescripcionServicio"
                        value={formData.DescripcionServicio}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>


                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default ServicioList;
