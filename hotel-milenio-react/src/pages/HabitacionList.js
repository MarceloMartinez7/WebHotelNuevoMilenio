import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';

function HabitacionList() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHabitacion, setSelectedHabitacion] = useState({});
  const [formData, setFormData] = useState({
    N_de_habitacion: "",
    ID_tipoHabitacion: "",
    Num_Cama: "",
    ID_Estado: "",
    Precio: "",
    Imagen: null, // Para almacenar la imagen
  });

  // Función para abrir el modal y pasar los datos de la habitación seleccionada
  const openModal = (habitacion) => {
    setSelectedHabitacion(habitacion);

    // Convertir las claves de la habitación a minúsculas y asignarlas a formData
    setFormData({
      N_de_habitacion: habitacion.N_de_habitacion,
      ID_tipoHabitacion: habitacion.ID_tipoHabitacion,
      Num_Cama: habitacion.Num_Cama,
      ID_Estado: habitacion.ID_Estado,
      Precio: habitacion.Precio,
      Imagen: null,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'Imagen') {
      setFormData({
        ...formData,
        Imagen: files[0], // Guarda la imagen
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const loadHabitaciones = () => {
    // Realiza una solicitud GET al servidor para obtener la lista de habitaciones
    fetch('http://localhost:5000/crud/ListarHabitaciones')
      .then((response) => response.json())
      .then((data) => setHabitaciones(data))
      .catch((error) => console.error('Error al obtener las habitaciones:', error));
  };

  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    const idHabitacion = selectedHabitacion.ID_Habitacion;

    const formDataToUpdate = new FormData();
    formDataToUpdate.append('N_de_habitacion', formData.N_de_habitacion);
    formDataToUpdate.append('ID_tipoHabitacion', formData.ID_tipoHabitacion);
    formDataToUpdate.append('Num_Cama', formData.Num_Cama);
    formDataToUpdate.append('ID_Estado', formData.ID_Estado);
    formDataToUpdate.append('Precio', formData.Precio);
    formDataToUpdate.append('Imagen', formData.Imagen); // Agrega la imagen al formulario

    // Realiza una solicitud PUT al servidor para actualizar el registro de la habitación
    fetch(`http://localhost:5000/crud/habitacion/update/${idHabitacion}`, {
      method: 'PUT',
      body: formDataToUpdate,
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadHabitaciones();
        }
      })
      .catch((error) => console.error('Error al actualizar el registro de la habitación:', error));
  };


  // Función para manejar la eliminación de una habitación
  const handleDelete = (idHabitacion) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta habitación?');
    if (confirmation) {
      // Realiza una solicitud DELETE al servidor para eliminar la habitación
      fetch(`http://localhost:5000/crud/habitacion/delete/${idHabitacion}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de habitaciones
            loadHabitaciones();
            alert('Habitación eliminada con éxito.');
          } else {
            alert('Error al eliminar la habitación. Por favor, inténtalo de nuevo más tarde.');
          }
        })
        .catch((error) => {
          console.error('Error al eliminar la habitación:', error);
          alert('Ocurrió un error al eliminar la habitación. Por favor, verifica tu conexión a Internet o inténtalo de nuevo más tarde.');
        });
    }
  };

  // Realiza una solicitud GET al servidor para obtener la lista de habitaciones al cargar el componente
  useEffect(() => {
    loadHabitaciones();
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Habitaciones</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Número de Habitación</th>
                <th>Tipo de Habitación</th>
                <th>Número de Camas</th>
                <th>ID Estado</th>
                <th>Precio</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {habitaciones.map((habitacion) => (
                <tr key={habitacion.ID_Habitacion}>
                  <td>{habitacion.ID_Habitacion}</td>
                  <td>{habitacion.N_de_habitacion}</td>
                  <td>{habitacion.Tipo_Habitacion}</td>
                  <td>{habitacion.Num_Cama}</td>
                  <td>{habitacion.Estado_Habitacion}</td>
                  <td>{habitacion.Precio}</td>
                  <td>
                    <img
                      src={`data:image/jpeg;base64, ${habitacion.Imagen}`}
                      alt={`Imagen de la habitación ${habitacion.N_de_habitacion}`}
                      className="img-habitacion"
                    />
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(habitacion)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(habitacion.ID_Habitacion)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Habitación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Habitación</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="numeroHabitacion" label="Número de Habitación">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el número de habitación"
                        name="N_de_habitacion"
                        value={formData.N_de_habitacion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="tipoHabitacion" label="ID Tipo de Habitación">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el ID del tipo de habitación"
                        name="ID_tipoHabitacion"
                        value={formData.ID_tipoHabitacion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="numeroCamas" label="Número de Camas">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el número de camas"
                        name="Num_Cama"
                        value={formData.Num_Cama}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="idEstado" label="ID Estado">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el ID del estado"
                        name="ID_Estado"
                        value={formData.ID_Estado}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="precio" label="Precio">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el precio"
                        name="Precio"
                        value={formData.Precio}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="imagen" label="Imagen">
                      <Form.Control
                        type="file"
                        name="Imagen"
                        accept=".jpg, .jpeg, .png" // Agrega las extensiones de archivo permitidas
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

export default HabitacionList;
