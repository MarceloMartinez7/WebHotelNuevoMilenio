import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import { FaTrashCan, FaPencil, FaBan } from 'react-icons/fa6'; // Importar el ícono de cancelar
import Header from '../components/Header';

function ReservacionesList({ handleReservacionSelect }) {
  const [reservaciones, setReservaciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservacion, setSelectedReservacion] = useState({});
  const [formData, setFormData] = useState({
    Cedula: "",
    Nombre: "",
    Apellido: "",
    F_entrada: "",
    F_salida: "",
    TipoServicio: "",
    EstadoReserva: "",
    N_de_habitacion: "",
    NombreEmpleado: "",
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredReservaciones = reservaciones.filter((reservacion) => {
    if (reservacion && typeof reservacion === 'object') {
      const nombre = reservacion.Nombre ? reservacion.Nombre.toLowerCase() : '';
      const apellido = reservacion.Apellido ? reservacion.Apellido.toLowerCase() : '';
      const cedula = reservacion.Cedula ? reservacion.Cedula.toLowerCase() : '';

      const search = searchQuery.toLowerCase();

      return (
        nombre.includes(search) ||
        apellido.includes(search) ||
        cedula.includes(search)
      );
    } else {
      return false;
    }
  });

  const openModal = (reservacion) => {
    setSelectedReservacion(reservacion);
    setFormData({
      Cedula: reservacion.Cedula,
      Nombre: reservacion.Nombre,
      Apellido: reservacion.Apellido,
      F_entrada: reservacion.F_entrada,
      F_salida: reservacion.F_salida,
      TipoServicio: reservacion.TipoServicio,
      EstadoReserva: reservacion.EstadoReserva,
      N_de_habitacion: reservacion.N_de_habitacion,
      NombreEmpleado: reservacion.NombreEmpleado,
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

  const handleUpdate = () => {
    const formattedF_entrada = formatFecha(formData.F_entrada); // Formatear la fecha
    const formattedF_salida = formatFecha(formData.F_salida);

    const updatedData = {
      ...formData,
      F_entrada: formattedF_entrada,
      F_salida: formattedF_salida,
    };

    fetch(`http://localhost:5000/crud/reservacionUpdate/${selectedReservacion.ID_ReservaEstancia}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadReservaciones();
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const año = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  };

  const loadReservaciones = () => {
    fetch('http://localhost:5000/crud/ListarReservaciones')
      .then((response) => response.json())
      .then((data) => setReservaciones(data))
      .catch((error) => console.error('Error al obtener las reservaciones:', error));
  };

  const handleDelete = (idReservaEstancia) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta Reservación?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deletereserva/${idReservaEstancia}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadReservaciones();
            alert('Reservación eliminada con éxito.');
          } else {
            alert('Error al eliminar la Reservación. Por favor, inténtalo de nuevo más tarde.');
          }
        })
        .catch((error) => {
          console.error('Error al eliminar la Reservación:', error);
          alert('Ocurrió un error al eliminar la Reservación. Por favor, verifica tu conexión a Internet o inténtalo de nuevo más tarde.');
        });
    }
  };

  // Nueva función para cancelar la reserva
  const handleCancelarReserva = (idReservaEstancia) => {
    const confirmation = window.confirm('¿Seguro que deseas cancelar esta Reservación?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/cancelarReserva/${idReservaEstancia}`, {
        method: 'PUT', // Utiliza el método PUT para actualizar el estado de la reserva a "Cancelado"
      })
        .then((response) => {
          if (response.ok) {
            loadReservaciones();
            alert('Reservación cancelada con éxito.');
          } else {
            alert('Error al cancelar la Reservación. Por favor, inténtalo de nuevo más tarde.');
          }
        })
        .catch((error) => {
          console.error('Error al cancelar la Reservación:', error);
          alert('Ocurrió un error al cancelar la Reservación. Por favor, verifica tu conexión a Internet o inténtalo de nuevo más tarde.');
        });
    }
  };

  useEffect(() => {
    loadReservaciones();
  }, []);

  return (
    <div>
      <Header />
      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Reservaciones</Card.Title>
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
                <th>ID Reservación</th>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha de Entrada</th>
                <th>Fecha de Salida</th>
                <th>Tipo de Servicio</th>
                <th>Estado de Reservación</th>
                <th>Número de Habitación</th>
                <th>Nombre del Empleado</th>
                <th>Actualizar</th>
                <th>Eliminar</th>
                <th>Cancelar Reservación</th> {/* Nuevo botón de cancelar */}
              </tr>
            </thead>
            <tbody>
              {filteredReservaciones.map((reservacion) => (
                <tr key={reservacion.ID_ReservaEstancia}>
                  <td>{reservacion.ID_ReservaEstancia}</td>
                  <td>{reservacion.Cedula}</td>
                  <td>{reservacion.Nombre}</td>
                  <td>{reservacion.Apellido}</td>
                  <td>{formatFecha(reservacion.F_entrada)}</td>
                  <td>{formatFecha(reservacion.F_salida)}</td>
                  <td>{reservacion.TipoServicio}</td>
                  <td>{reservacion.EstadoReserva}</td>
                  <td>{reservacion.N_de_habitacion}</td>
                  <td>{reservacion.NombreEmpleado}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(reservacion)}>
                      Actualizar <FaPencil />
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(reservacion.ID_ReservaEstancia)}>
                      Eliminar <FaTrashCan />
                    </Button>
                  </td>
                  <td>
                    <Button variant="warning" onClick={() => handleCancelarReserva(reservacion.ID_ReservaEstancia)}>
                      Cancelar Reservación <FaBan /> 
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Reservación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Reservación</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <label>Tipo de Servicio:</label>
                    <div>
                      <input
                        type="radio"
                        id="reserva"
                        name="TipoServicio"
                        value="reserva"
                        checked={formData.TipoServicio === "reserva"}
                        onChange={handleFormChange}
                        style={{ display: 'inline-block', marginRight: '10px' }}
                      />
                      <label htmlFor="reserva">Reserva</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="estancia"
                        name="TipoServicio"
                        value="estancia"
                        checked={formData.TipoServicio === "estancia"}
                        onChange={handleFormChange}
                        style={{ display: 'inline-block', marginRight: '10px' }}
                      />
                      <label htmlFor="estancia">Estancia</label>
                    </div>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="fechaEntrada" label="Fecha de Entrada">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la Fecha de Entrada"
                        name="F_entrada"
                        value={formatFecha(formData.F_entrada)}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="fechaSalida" label="Fecha de Salida">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la Fecha de Salida"
                        name="F_salida"
                        value={formatFecha(formData.F_salida)}
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

export default ReservacionesList;
