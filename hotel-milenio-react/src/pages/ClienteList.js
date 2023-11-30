import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';
import Header from '../components/Header';
import './cliente-list.css';

function ClienteList({ handleClienteSelect }) {
    const [clientes, setClientes] = useState([]);
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


  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredClientes = clientes.filter((cliente) => {
    if (cliente && typeof cliente === 'object') {
      const nombre1 = cliente.Nombre1 ? cliente.Nombre1.toLowerCase() : '';
      const nombre2 = cliente.Nombre2 ? cliente.Nombre2.toLowerCase() : '';
      const apellido1 = cliente.Apellido1 ? cliente.Apellido1.toLowerCase() : '';
      const apellido2 = cliente.Apellido2 ? cliente.Apellido2.toLowerCase() : '';
      const telefono = cliente.Telefono ? cliente.Telefono.toLowerCase() : '';

      const search = searchQuery.toLowerCase();

      return (
        nombre1.includes(search) ||
        nombre2.includes(search) ||
        apellido1.includes(search) ||
        apellido2.includes(search) ||
        telefono.includes(search)
      );
    } else {
      return false;
    }
  });

  const openModal = (cliente) => {
    setSelectedCliente(cliente);
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadClientes = () => {
    fetch('http://localhost:5000/crud/ListarClientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los clientes y personas:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updateCliente/${selectedCliente.ID_Persona}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadClientes();
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  const handleDelete = (idCliente, idPersona) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este Cliente?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteCliente/${idCliente}/${idPersona}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadClientes();
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

  // Nueva función para seleccionar un cliente
const handleSelectCliente = (idCliente, nombre, apellido) => {
  handleClienteSelect({
    ID_cliente: idCliente,
    Nombre1: nombre,
    Apellido1: apellido,
  });
};


  useEffect(() => {
    loadClientes();
  }, []);

  return (
      <div>
        <Header />
        <Card className="m-3">
          <Card.Body>
            <Card.Title className="mb-3">Listado de Clientes</Card.Title>
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
                  <th>Cedula</th>
                  <th>Nombre1</th>
                  <th>Nombre2</th>
                  <th>Apellido1</th>
                  <th>Apellido2</th>
                  <th>Telefono</th>
                  <th>Procedencia</th>
                  <th>Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.ID_cliente}>
                    <td>{cliente.ID_cliente}</td>
                    <td>{cliente.Cedula}</td>
                    <td>{cliente.Nombre1}</td>
                    <td>{cliente.Nombre2}</td>
                    <td>{cliente.Apellido1}</td>
                    <td>{cliente.Apellido2}</td>
                    <td>{cliente.Telefono}</td>
                    <td>{cliente.Procedencia}</td>
                    <td>
                    <Button className="update-button" onClick={() => openModal(cliente)}>Actualizar<FaPencil /></Button>
<Button className="delete-button" onClick={() => handleDelete(cliente.ID_cliente, cliente.ID_Persona)}>Eliminar <FaTrashCan /></Button>
<Button className="select-button" onClick={() => handleSelectCliente(cliente.ID_cliente, cliente.Nombre1, cliente.Apellido1)}>Seleccionar</Button>
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
                      <FloatingLabel controlId="procedencia" label="Procedencia">
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
