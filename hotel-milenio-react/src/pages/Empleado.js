import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Empleado() {

    // Crear un estado para cada campo del formulario
    const [Nombre1, setNombre1] = useState('');
    const [Nombre2, setNombre2] = useState('');
    const [Apellido1, setApellido1] = useState('');
    const [Apellido2, setApellido2] = useState('');
    const [Usuario, setUsuario] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const [Telefono, setTelefono] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            Usuario,
            Nombre1,
            Nombre2,
            Apellido1,
            Apellido2,
            Telefono,
            Contraseña,
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/createEmpleado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // El registro se creó exitosamente
                alert('Registro exitoso');
                // Reiniciar los campos del formulario
                setNombre1('');
                setNombre2('');
                setApellido1('');
                setApellido2('');
                setContraseña('');
                setUsuario('');
                setTelefono('');
            } else {
                alert('Error al registrar el cliente');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };

    return (
        <div>
            <Header />

            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Registro de Empleado</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="nombre" label="Nombre">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el nombre"
                                            value={Nombre1}
                                            onChange={(e) => setNombre1(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="nombre2" label="Segundo Nombre">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese su segundo nombre"
                                            value={Nombre2}
                                            onChange={(e) => setNombre2(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="apellido" label="Apellido">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el apellido"
                                            value={Apellido1}
                                            onChange={(e) => setApellido1(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>



                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="apellido2" label="Segundo Apellido">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el segundo apellido"
                                            value={Apellido2}
                                            onChange={(e) => setApellido2(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="Usuario" label="Usuario">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Usuario"
                                            value={Usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="Contraseña" label="Contraseña">
                                        <Form.Control
                                            type="password"
                                            placeholder="Ingrese la procedencia"
                                            value={Contraseña}
                                            onChange={(e) => setContraseña(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="12" lg="12">
                                    <FloatingLabel controlId="telefono" label="Telefono">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Telefono"
                                            value={Telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                        />
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

        </div>
    );
}

export default Empleado;