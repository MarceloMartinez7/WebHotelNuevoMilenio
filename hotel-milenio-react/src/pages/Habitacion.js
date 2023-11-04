import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Habitacion() {

    // Crear un estado para cada campo del formulario
    const [ID_Habitacion, setID_Habitacion] = useState('');
    const [N_de_habitacion, setN_de_habitacion] = useState('');
    const [ID_tipoHabitacion, setID_tipoHabitacion] = useState('');
    const [Num_Cama, setNum_Cama] = useState('');
    const [ID_Estado, setID_Estado] = useState('');
    const [Precio, setPrecio] = useState('');
    const [Imagenes, setImagenes] = useState('');

    const [tipohabitaciones, setTipohabitaciones] = useState([]);

    const [estados, setEstados] = useState([]);




    const handleImagenChange = (event) => {
        const file = event.target.files[0]; // Obtener el primer archivo seleccionado

        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result; // Obtener la imagen en formato base64
            setImagenes(base64String); // Guardado imagen en variable de estado
        };
        if (file) {
            reader.readAsDataURL(file); // Lee el contenido del archivo como base64
        }
    };






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

    useEffect(() => {
        fetch('http://localhost:5000/crud/EstadoCombo')
            .then(response => response.json())
            .then(data => {
                setEstados(data);
            })
            .catch(error => {
                console.error('Error al obtener los empleados', error);
            });
    }, []);


    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            ID_Habitacion,
            N_de_habitacion,
            ID_tipoHabitacion,
            Num_Cama,
            ID_Estado,
            Precio,
            Imagenes,
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/createHabitacion', {
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
                setID_Habitacion('');
                setN_de_habitacion('');
                setID_tipoHabitacion('');
                setNum_Cama('');
                setID_Estado('');
                setPrecio('');

            } else {
                alert('Error al registrar la habitacion');
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
                        <Card.Title>Registro de Habitacion</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="ID_Habitacion" label="ID_Habitacion">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el ID_Habitacion"
                                            value={ID_Habitacion}
                                            onChange={(e) => setID_Habitacion(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="nombre2" label="Numero de habitacion">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el numero de habitacion"
                                            value={N_de_habitacion}
                                            onChange={(e) => setN_de_habitacion(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>


                                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="ID_tipoHabitacion" label="Tipo de habitacion">
                                        <Form.Select
                                            aria-label="ID_tipoHabitacion"
                                            value={ID_tipoHabitacion}
                                            onChange={(e) => setID_tipoHabitacion(e.target.value)}
                                        >
                                            <option>Seleccione el TipoHabitacion</option>
                                            {tipohabitaciones.map((tipohabitacion) => (
                                                <option key={tipohabitacion.ID_tipoHabitacion} value={tipohabitacion.ID_tipoHabitacion}>
                                                    {tipohabitacion.Nombre}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>



                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="Num_Cama" label="Numero de cama">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el numero de cama"
                                            value={Num_Cama}
                                            onChange={(e) => setNum_Cama(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>



                                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="Estado" label="Nombre de estado">
                                        <Form.Select
                                            aria-label="Estado"
                                            value={ID_Estado}
                                            onChange={(e) => setID_Estado(e.target.value)}
                                        >
                                            <option>Seleccione el Estado</option>
                                            {estados.map((estado) => (
                                                <option key={estado.ID_Estado} value={estado.ID_Estado}>
                                                    {estado.NombreEstado}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>




                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="precio" label="Precio">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el precio"
                                            value={Precio}
                                            onChange={(e) => setPrecio(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>



                                <Col sm="12" md="6" lg="6">
                                    <Form.Group controlId="imagen" className="" >
                                        <Form.Control
                                            type="file"
                                            accept=".jpg, .png, .jpeg"
                                            size="lg"
                                            onChange={handleImagenChange}
                                        />
                                    </Form.Group>
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

export default Habitacion;