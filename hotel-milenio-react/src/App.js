import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Cliente from './pages/Cliente';
import ClienteList from './pages/ClienteList';
import Empleado from './pages/Empleado';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Cliente" element={<Cliente />} />
        <Route path="/actualizar-cliente" element={<ClienteList />} />
        <Route path="/Empleado" element={<Empleado />} />
        
      </Routes>
    </Router>
  );
}

export default App;