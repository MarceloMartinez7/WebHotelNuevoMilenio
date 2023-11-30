import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import './habitacion-list.css'

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
    Imagenes: "", // Para almacenar la imagen
  });

  const [tipohabitaciones, setTipohabitaciones] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/crud/TipoHabitacionCombo')
      .then(response => response.json())
      .then(data => {
        setTipohabitaciones(data);
      })
      .catch(error => {
        console.error('Error al obtener las habitaciones', error);
      });
  }, []);

  // Función para abrir el modal y pasar los datos de la habitación seleccionada
  const openModal = (habitacion) => {
    setSelectedHabitacion(habitacion);

    // Convertir las claves de la habitación a minúsculas y asignarlas a formData
    setFormData({
      N_de_habitacion: habitacion.N_de_habitacion,
      ID_tipoHabitacion: habitacion.ID_tipoHabitacion,
      Num_Cama: habitacion.Num_Cama,
      Precio: habitacion.Precio,
      Imagenes: habitacion.Imagenes,
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

  const handleImagenChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result; // Obtener la imagen en formato base64
      setFormData({
        ...formData,
        Imagenes: base64String, // Usa "Imagenes" en lugar de "imagen"
      });
    };
    if (file) {
      reader.readAsDataURL(file); // Lee el contenido del archivo como base64
    }
  };

  const loadHabitaciones = () => {
    // Realiza una solicitud GET al servidor para obtener la lista de habitaciones
    fetch('http://localhost:5000/crud/ListarHabitaciones')
      .then((response) => response.json())
      .then((data) => setHabitaciones(data))
      .catch((error) => console.error('Error al obtener las habitaciones:', error));
  };

  const handleUpdate = () => {
    console.log('Datos a enviar para actualizar:', formData);
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/habitacionUpdate/${selectedHabitacion.ID_Habitacion}`, {
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
          loadHabitaciones(); // Cargar la lista de empleado actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para cambiar el estado de una habitación a "Disponible" (ID_Estado: 1)
  const changeHabitacionStateDisponible = (idHabitacion) => {
    console.log(`Cambiando el estado de la habitación ${idHabitacion} a Disponible`);
  
    // Realiza una solicitud PUT al servidor para cambiar el estado de la habitación a Disponible
    fetch(`http://localhost:5000/crud/habitacionChangeStateDisponible/${idHabitacion}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ID_Estado: 1 }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`La habitación ${idHabitacion} se cambió con éxito a Disponible`);
          loadHabitaciones(); // Cargar la lista de habitaciones actualizada
        } else {
          console.error(`Error al cambiar el estado de la habitación ${idHabitacion} a Disponible`);
        }
      })
      .catch((error) => console.error('Error al cambiar el estado de la habitación:', error));
  };

  // Función para cambiar el estado de una habitación a "Sucio" (ID_Estado: 3)
  const changeHabitacionStateSucio = (idHabitacion) => {
    console.log(`Cambiando el estado de la habitación ${idHabitacion} a Sucio`);
  
    // Realiza una solicitud PUT al servidor para cambiar el estado de la habitación a Sucio
    fetch(`http://localhost:5000/crud/habitacionChangeStateSucio/${idHabitacion}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ID_Estado: 3 }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`La habitación ${idHabitacion} se cambió con éxito a Sucio`);
          loadHabitaciones(); // Cargar la lista de habitaciones actualizada
        } else {
          console.error(`Error al cambiar el estado de la habitación ${idHabitacion} a Sucio`);
        }
      })
      .catch((error) => console.error('Error al cambiar el estado de la habitación:', error));
  };

// ...


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

  // Realiza una solicitud GET al servidor para obtener las habitaciones
  useEffect(() => {
    loadHabitaciones();
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Habitaciones</Card.Title>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Número de Habitación</th>
                <th>Tipo de Habitación</th>
                <th>Número de Camas</th>
                <th>ID Estado</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th>Acciones</th>
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
                  <td>C$ {habitacion.Precio}</td>
                  <td>
                    <img src={habitacion.Imagenes} alt={habitacion.Tipo_Habitacion} style={{ width: '150px' }} />
                  </td>
                  <td>
  <div className="button-container">
    <Button className="update-button" onClick={() => openModal(habitacion)}>
      Actualizar
    </Button>
    <Button className="delete-button" onClick={() => handleDelete(habitacion.ID_Habitacion)}>
      Eliminar
    </Button>
    <Button className="change-sucio-button" onClick={() => changeHabitacionStateSucio(habitacion.ID_Habitacion, 3)}>
      Cambiar a Sucio
    </Button>
    <Button className="change-disponible-button" onClick={() => changeHabitacionStateDisponible(habitacion.ID_Habitacion, 1)}>
      Cambiar a Disponible
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

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="ID_tipoHabitacion" label="Tipo de habitación">
                      <Form.Select
                        aria-label="ID_tipoHabitacion"
                        name="ID_tipoHabitacion"
                        value={formData.ID_tipoHabitacion}
                        onChange={handleFormChange}
                      >
                        <option>Seleccione el TipoHabitacion</option>
                        {tipohabitaciones.map((tipohabitacion) => (
                          <option
                            key={tipohabitacion.ID_tipoHabitacion}
                            value={tipohabitacion.ID_tipoHabitacion}
                          >
                            {tipohabitacion.Nombre}
                          </option>
                        ))}
                      </Form.Select>
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

                  <Col sm="12" md="12" lg="12">
                    <Form.Group controlId="imagen" className="">
                      <Form.Control
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        size="lg"
                        name="imagen"
                        onChange={handleImagenChange}
                      />
                    </Form.Group>
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
