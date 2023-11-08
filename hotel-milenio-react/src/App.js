import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Cliente from './pages/Cliente';
import ClienteList from './pages/ClienteList';
import Empleado from './pages/Empleado';
import EmpleadoList from './pages/EmpleadoList';
import HabitacionList from './pages/HabitacionList';
import ReservacionEstancia from './pages/ReservacionEstancia';
import ReservacionesList from './pages/ReservacionesList';
import Habitacion from './pages/Habitacion';


import Servicio from './pages/Servicios';
import ServicioList from './pages/ServiciosList';

// Agregar una nueva importación para el componente de inicio de sesión
import Login from './pages/login';

import Estadisticas from './pages/Estadisticas';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de inicio de sesión como ruta predeterminada */}
        <Route path="/" element={<Login />} />

        {/* Otras rutas de la aplicación */}
        <Route path="/Home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/actualizar-cliente" element={<ClienteList />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/actualizar-empleado" element={<EmpleadoList />} />
        <Route path="/Habitacion" element={<Habitacion />} />
        <Route path="/ListarHabitacion" element={<HabitacionList />} />
        <Route path="/ReservacionEstancia" element={<ReservacionEstancia />} />
        <Route path="/ListadoReservacionEstancia" element={<ReservacionesList />} />

        <Route path="/servicios" element={<Servicio />} />
        <Route path="/listarservicios" element={<ServicioList />} />
        <Route path="/Reportes" element={<Estadisticas />} />
      </Routes>
    </Router>
  );
}

export default App;
