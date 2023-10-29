import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import ClienteList from './ClienteList';

function ReservacionEstancia() {
    const [showClientListModal, setShowClientListModal] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState({});
    const [formData, setFormData] = useState({
        ID_cliente: "",
        F_entrada: "",
        F_salida: "",
        ID_Empleado: "",
        TipoServicio: "",
        ID_Habitacion: ""
    });

    const [habitaciones, setHabitaciones] = useState([]); // Estado para almacenar las especialidades
    const [Habitacion, setHabitacion] = useState(''); // Estado para el valor seleccionado


    const [empleados, setEmpleados] = useState([]); // Estado para almacenar las especialidades
    const [Empleado, setEmpleado] = useState(''); // Estado para el valor seleccionado

    useEffect(() => {
        // Realiza una solicitud a tu ruta para obtener las especialidades
        fetch('http://localhost:5000/crud/ComboHabitacion')
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado con las especialidades obtenidas
                setHabitaciones(data);
            })
            .catch(error => {
                console.error('Error al obtener las habitaciones', error);
            });
    }, []);


    useEffect(() => {
        // Realiza una solicitud a tu ruta para obtener las especialidades
        fetch('http://localhost:5000/crud/ComboEmpleado')
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado con las especialidades obtenidas
                setEmpleados(data);
            })
            .catch(error => {
                console.error('Error al obtener las habitaciones', error);
            });
    }, []);

   

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario al servidor
        // Usar formData para enviar los datos al backend
    };

    return (
        <div>
            <Header />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Registro de Reservación de Estancia</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">


                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="idCliente" label="Cliente">
                                        <Form.Control
                                            type="text"
                                            value={
                                                selectedCliente.ID_cliente
                                                    ? `${selectedCliente.ID_cliente} - ${selectedCliente.Nombre1} ${selectedCliente.Apellido1}`
                                                    : ''
                                            }
                                            disabled
                                        />
                                        <Button variant="primary" onClick={() => setShowClientListModal(true)}>
                                            Seleccionar Cliente
                                        </Button>
                                    </FloatingLabel>
                                </Col>



                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="fechaEntrada" label="Fecha de Entrada">
                                        <Form.Control
                                            type="date"
                                            name="F_entrada"
                                            value={formData.F_entrada}
                                            onChange={handleFormChange}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="fechaSalida" label="Fecha de Salida">
                                        <Form.Control
                                            type="date"
                                            name="F_salida"
                                            value={formData.F_salida}
                                            onChange={handleFormChange}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="idEmpleado" label="Empleado">
                                        <Form.Select
                                            aria-label="idEmpleado"
                                            value={Empleado}
                                            onChange={(e) => setEmpleado(e.target.value)}
                                        >
                                            <option>Seleccione el empleado</option>
                                            {empleados.map((empleado) => (
                                                <option key={empleado.ID_Empleado} value={empleado.NombreEmpleado}>
                                                    {empleado.NombreEmpleado}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>








                                <Col sm="6" md="6" lg="6">
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




                                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="idHabitacion" label="Habitacion">
                                        <Form.Select
                                            aria-label="idHabitacion"
                                            value={Habitacion}
                                            onChange={(e) => setHabitacion(e.target.value)}
                                        >
                                            <option>Seleccione la habitacion</option>
                                            {habitaciones.map((habitacion) => (
                                                <option key={habitacion.ID_Habitacion} value={habitacion.NombreHabitacion}>
                                                    {habitacion.NombreHabitacion}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>


                            </Row>
                            <div className="center-button">
                                <Button variant="primary" type="submit" className="mt-3 custom-button" size="lg">
                                    Registrar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={showClientListModal} onHide={() => setShowClientListModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ClienteList handleClienteSelect={setSelectedCliente} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ReservacionEstancia;
