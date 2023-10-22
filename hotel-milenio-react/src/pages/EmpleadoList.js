import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';


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
          <Table striped bordered hover>
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

              </tr>
            </thead>
            <tbody>
              {empleado.map((empleado) => (
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
                  <td>
                    <Button variant="primary" onClick={() => openModal(empleado)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(empleado.ID_Empleado, empleado.ID_Persona)}>Eliminar</Button>
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
                    <FloatingLabel controlId="apellido1" label="Primer apellido">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el primer apellido"
                        name="Apellido1"
                        value={formData.Apellido1}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="apellido2" label="Segundo apellido">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el segundo apellido"
                        name="Apellido2"
                        value={formData.Apellido2}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>



                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="telefono" label="Teléfono">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el teléfono"
                        name="Telefono"
                        value={formData.Telefono}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="Usuario" label="Usuario">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el Usuario"
                        name="Usuario"
                        value={formData.Usuario}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>



                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="Contraseña" label="Contraseña">
                      <Form.Control
                        type="password"
                        placeholder="Ingrese la Contraseña"
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
