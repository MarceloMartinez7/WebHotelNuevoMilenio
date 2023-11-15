import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import '../styles/App.css';
import html2canvas from 'html2canvas';

function Estadisticas() {
  const [productos, setProductos] = useState([]);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/crud/RegistroEstadistica')  // Ruta para obtener datos de estadísticas
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los datos de estadísticas:', error));
  }, []);

  useEffect(() => {
    if (productos.length > 0) {
      const ctx = document.getElementById('myChart');

      if (myChart !== null) {
        myChart.destroy();
      }

      const nombresProductos = productos.map((producto) => producto.DiaSemana);
      const cantidades = productos.map((producto) => producto.TotalReservaciones);

      const almacen = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: nombresProductos,
          datasets: [{
            label: 'Total de Reservaciones',
            data: cantidades,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setMyChart(almacen);
    }
  }, [productos]);

  const generarReporteAlmacen = () => {
    fetch('http://localhost:5000/crud/RegistroEstadistica')
      .then((response) => response.json())
      .then((productos) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Estado de Almacén", 20, 10);

        productos.forEach((producto) => {
          doc.text(`Nombre: ${producto.DiaSemana}`, 20, y);
          doc.text(`Cantidad: ${producto.TotalReservaciones}`, 20, y + 10);

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_almacen.pdf");
      })
      .catch((error) => console.error('Error al obtener los productos:', error));
  };

  const generarReporteAlmacenImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('myChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.text("Reporte de Estado de Almacén", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_almacen_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container className="margen-contenedor">
        <Row className="g-3">
          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Estado de Reserva</Card.Title>
                <canvas id="myChart" height="300"></canvas>
              </Card.Body>
              <Card.Body>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="6" md="6" lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Estado de Reserva</Card.Title>
              </Card.Body>
              <Card.Body>
                <Button onClick={generarReporteAlmacenImg}>
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Estadisticas;
