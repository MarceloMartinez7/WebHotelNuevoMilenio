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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Cliente" element={<Cliente />} />
        <Route path="/actualizar-cliente" element={<ClienteList />} />
        <Route path="/Empleado" element={<Empleado />} />
        <Route path="/actualizar-Empleado" element={<EmpleadoList />} />
        <Route path="/ListarHabitacion" element={<HabitacionList />} />
        <Route path="/ReservacionEstancia" element={<ReservacionEstancia />} />
        <Route path="/ListadoReservacionEstancia" element={<ReservacionesList />} />
      </Routes>
    </Router>
  );
}

export default App;