import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function ClienteList() {
  const [cliente, setcliente] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState({});
  const [formData, setFormData] = useState({
    Cedula: "",
    Nombre1: "",
    Nombre2: "",
    Apellido1: "",
    Apellido2: "",
    Telefono: "",
    Procedencia: ""
  });

  // Función para abrir el modal y pasar los datos del cliente seleccionado
  const openModal = (cliente) => {
    setSelectedCliente(cliente);

    // Convertir las claves de cliente a minúsculas y asignarlas a formData
    setFormData({
      Cedula: cliente.Cedula,
      Nombre1: cliente.Nombre1,
      Nombre2: cliente.Nombre2,
      Apellido1: cliente.Apellido1,
      Apellido2: cliente.Apellido2,
      Telefono: cliente.Telefono,
      Procedencia: cliente.Procedencia,
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

  const loadCliente = () => {
    fetch('http://localhost:5000/crud/ListarClientes')
      .then((response) => response.json())
      .then((data) => setcliente(data))
      .catch((error) => console.error('Error al obtener los clientes y personas:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateCliente/${selectedCliente.ID_Persona}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de cliente
          setShowModal(false);
          loadCliente(); // Cargar la lista de cliente actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };



  const handleDelete = (idCliente, idPersona) => {


    console.log("idCliente:", idCliente);
    console.log("idPersona:", idPersona);
    const confirmation = window.confirm('¿Seguro que deseas eliminar este Cliente?');
    if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar el Cliente y la Persona
        fetch(`http://localhost:5000/crud/deleteCliente/${idCliente}/${idPersona}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                // La eliminación fue exitosa, refresca la lista de Cliente
                loadCliente();
                alert('Cliente eliminado con éxito.');
            } else {
                alert('Error al eliminar el Cliente. Por favor, inténtalo de nuevo más tarde.');
            }
        })
        .catch((error) => {
            console.error('Error al eliminar el Cliente:', error);
            alert('Ocurrió un error al eliminar el Cliente. Por favor, verifica tu conexión a Internet o inténtalo de nuevo más tarde.');
        });
    }
};


  // Realiza una solicitud GET al servidor para obtener los Cliente
  useEffect(() => {
    fetch('http://localhost:5000/crud/ListarClientes')
      .then((response) => response.json())
      .then((data) => setcliente(data))
      .catch((error) => console.error('Error al obtener los Cliente y personas:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Cliente</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID_2</th>
                <th>Cedula</th>
                <th>Nombre1</th>
                <th>Nombre2</th>
                <th>Apellido1</th>
                <th>Apellido2</th>
                <th>Telefono</th>
                <th>Procedencia</th>

              </tr>
            </thead>
            <tbody>
              {cliente.map((cliente) => (
                <tr key={cliente.ID_cliente}>
                  <td>{cliente.ID_cliente}</td>
                  <td>{cliente.ID_Persona}</td>
                  <td>{cliente.Cedula}</td>
                  <td>{cliente.Nombre1}</td>
                  <td>{cliente.Nombre2}</td>
                  <td>{cliente.Apellido1}</td>
                  <td>{cliente.Apellido2}</td>
                  <td>{cliente.Telefono}</td>
                  <td>{cliente.Procedencia}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(cliente)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(cliente.ID_cliente, cliente.ID_Persona)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Cliente</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">



                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="cedula" label="Cedula">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la Cedula"
                        name="Cedula"
                        value={formData.Cedula}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>



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
                    <FloatingLabel controlId="procedencia" label="procedencia">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la procedencia"
                        name="Procedencia"
                        value={formData.Procedencia}
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

export default ClienteList;
