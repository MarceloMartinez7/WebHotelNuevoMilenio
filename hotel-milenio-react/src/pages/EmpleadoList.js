import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';
import './empleado-list.css';


function EmpleadoList() {
  const [empleado, setempleado] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState({});
  const [formData, setFormData] = useState({
    Nombre1: "",
    Nombre2: "",
    Apellido1: "",
    Apellido2: "",
    Telefono: "",
    Usuario: "",
    Contraseña: ""
    
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredEmpleado = empleado.filter((empleado) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const nombre1 = empleado.Nombre1.toLowerCase();
    const nombre2 = empleado.Nombre2.toLowerCase();
    const apellido1 = empleado.Apellido1.toLowerCase();
    const apellido2 = empleado.Apellido2.toLowerCase();
    const telefono = empleado.Telefono.toLowerCase();
    const usuario = empleado.Usuario.toLowerCase();
    const contraseña = empleado.Contraseña.toLowerCase();
  
    const search = searchQuery.toLowerCase();
  
    // Verifica si la cadena de búsqueda se encuentra en alguno de los campos
    return (
      nombre1.includes(search) ||
      nombre2.includes(search) ||
      apellido1.includes(search) ||
      apellido2.includes(search) ||
      telefono.includes(search) ||
      usuario.includes(search) ||
      contraseña.includes(search)
    );
  });
  
  

 

  // Función para abrir el modal y pasar los datos del empleado seleccionado
  const openModal = (empleado) => {
    setSelectedEmpleado(empleado);

    // Convertir las claves de empleado a minúsculas y asignarlas a formData
    setFormData({
      Nombre1: empleado.Nombre1,
      Nombre2: empleado.Nombre2,
      Apellido1: empleado.Apellido1,
      Apellido2: empleado.Apellido2,
      Telefono: empleado.Telefono,
      Usuario: empleado.Usuario,
      Contraseña: empleado.Contraseña,
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

  const loadEmpleado = () => {
    fetch('http://localhost:5000/crud/ListarEmpleado')
      .then((response) => response.json())
      .then((data) => setempleado(data))
      .catch((error) => console.error('Error al obtener los empleado y personas:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {

    console.log('Datos a enviar para actualizar:', formData);
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateEmpleado/${selectedEmpleado.ID_Persona}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de empleado
          setShowModal(false);
          loadEmpleado(); // Cargar la lista de empleado actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };



  const handleDelete = (idEmpleado, idPersona) => {


    console.log("idEmpleado:", idEmpleado);
    console.log("idPersona:", idPersona);
    const confirmation = window.confirm('¿Seguro que deseas eliminar este Empleado?');
    if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar el empleado y la Persona
        fetch(`http://localhost:5000/crud/deleteEmpleado/${idEmpleado}/${idPersona}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                // La eliminación fue exitosa, refresca la lista de Empeado
                loadEmpleado();
                alert('Empleado eliminado con éxito.');
            } else {
                alert('Error al eliminar el Empleado. Por favor, inténtalo de nuevo más tarde.');
            }
        })
        .catch((error) => {
            console.error('Error al eliminar el Empleado:', error);
            alert('Ocurrió un error al eliminar el Empleado. Por favor, verifica tu conexión a Internet o inténtalo de nuevo más tarde.');
        });
    }
};


  // Realiza una solicitud GET al servidor para obtener los Empleado
  useEffect(() => {
    fetch('http://localhost:5000/crud/ListarEmpleado')
      .then((response) => response.json())
      .then((data) => setempleado(data))
      .catch((error) => console.error('Error al obtener los Empleado y personas:', error));
  }, []);

  return (
    <div>
      <Header />
  
      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Empleado</Card.Title>
  
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
                <th>ID</th>
                <th>ID_2</th>
                <th>Nombre1</th>
                <th>Nombre2</th>
                <th>Apellido1</th>
                <th>Apellido2</th>
                <th>Telefono</th>
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmpleado.map((empleado) => (
                <tr key={empleado.ID_Empleado}>
                  <td>{empleado.ID_Empleado}</td>
                  <td>{empleado.ID_Persona}</td>
                  <td>{empleado.Nombre1}</td>
                  <td>{empleado.Nombre2}</td>
                  <td>{empleado.Apellido1}</td>
                  <td>{empleado.Apellido2}</td>
                  <td>{empleado.Telefono}</td>
                  <td>{empleado.Usuario}</td>
                  <td>{empleado.Contraseña}</td>
                  <td className="button-container">
                    <Button className="update-button" onClick={() => openModal(empleado)}>Actualizar <FaPencil /></Button>
                    <Button className="delete-button" onClick={() => handleDelete(empleado.ID_Empleado, empleado.ID_Persona)}>Eliminar <FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
  
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Empleado</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre1" label="Primer Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el primer nombre"
                        name="Nombre1"
                        value={formData.Nombre1}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="nombre2" label="Segundo Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el segundo nombre"
                      name="Nombre2"
                      value={formData.Nombre2}
                      onChange={handleFormChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="apellido1" label="Apellido Paterno">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido paterno"
                      name="Apellido1"
                      value={formData.Apellido1}
                      onChange={handleFormChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="apellido2" label="Apellido Materno">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido materno"
                      name="Apellido2"
                      value={formData.Apellido2}
                      onChange={handleFormChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="telefono" label="Teléfono">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el teléfono"
                      name="Telefono"
                      value={formData.Telefono}
                      onChange={handleFormChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="usuario" label="Usuario">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el usuario"
                      name="Usuario"
                      value={formData.Usuario}
                      onChange={handleFormChange}
                    />
                  </FloatingLabel>
                </Col>
                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="contraseña" label="Contraseña">
                    <Form.Control
                      type="password"
                      placeholder="Ingrese la contraseña"
                      name="Contraseña"
                      value={formData.Contraseña}
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
export default EmpleadoList;
