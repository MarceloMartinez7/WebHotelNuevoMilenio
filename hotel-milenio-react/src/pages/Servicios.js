import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Servicio() {
    const [NombreServicio, setNombreServicio] = useState('');
    const [DescripcionServicio, setDescripcionServicio] = useState('');

    const [empleados, setEmpleados] = useState([]);
    const [Empleado, setEmpleado] = useState('');

    useEffect(() => {
        // Mueve la solicitud para obtener los empleados aquí
        fetch('http://localhost:5000/crud/ComboEmpleado')
            .then(response => response.json())
            .then(data => {
                setEmpleados(data);
            })
            .catch(error => {
                console.error('Error al obtener los empleados', error);
            });
    }, []); // Asegúrate de pasar un arreglo vacío como segundo argumento para que se ejecute solo una vez

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Utiliza el estado Empleado en lugar de ID_Empleado
        const formData = {
            ID_Empleado: Empleado, // Usar Empleado en lugar de ID_Empleado
            NombreServicio,
            DescripcionServicio,
        };
    
        console.log('handleSubmit iniciado');
        console.log('formData:', formData);
    
        try {
            const response = await fetch('http://localhost:5000/crud/createServicios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                alert('Registro exitoso');
                setEmpleado(''); // Restablece el valor del campo Empleado
                setNombreServicio('');
                setDescripcionServicio('');
            } else {
                alert('Error al registrar el servicio');
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
                        <Card.Title>Registro de Servicio</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">



                                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="idEmpleado" label="Empleado">
                                        <Form.Select
                                            aria-label="idEmpleado"
                                            value={Empleado}
                                            onChange={(e) => setEmpleado(e.target.value)}
                                        >
                                            <option>Seleccione el empleado</option>
                                            {empleados.map((empleado) => (
                                                <option key={empleado.ID_Empleado} value={empleado.ID_Empleado}>
                                                    {empleado.NombreEmpleado}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="NombreServicio" label="Nombre del Servicio">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el nombre del servicio"
                                            value={NombreServicio}
                                            onChange={(e) => setNombreServicio(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="DescripcionServicio" label="Descripción del Servicio">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la descripción del servicio"
                                            value={DescripcionServicio}
                                            onChange={(e) => setDescripcionServicio(e.target.value)}
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

export default Servicio;
