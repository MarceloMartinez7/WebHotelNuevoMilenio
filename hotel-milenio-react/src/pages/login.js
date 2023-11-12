import React, { useState } from 'react';
import './LoginForm.css';

function Login() {
  const [Usuario, setUsuario] = useState('');
  const [Contraseña, setContraseña] = useState('');
 
  const handleSubmit = async (e) => {
     e.preventDefault();
 
     const formData = { Usuario, Contraseña };
 
     try {
       const response = await fetch('http://localhost:5000/crud/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
       });
 
       if (response.ok) {
         window.location = '/home';
       } else {
         alert('Credenciales incorrectas');
       }
     } catch (error) {
       console.error('Error en la solicitud:', error);
       alert('Error en la solicitud al servidor');
     }
  };
 
  return (
     <div className="login-container">
       <div className="centered-content">
         <div className="form-container">
           <h1>Iniciar Sesión</h1>
           <form onSubmit={handleSubmit}>
             <div className="input-container">
               <label htmlFor="Usuario">Usuario</label>
               <input
                 type="text"
                 id="Usuario"
                 value={Usuario}
                 onChange={(e) => setUsuario(e.target.value)}
               />
             </div>
             <div className="input-container">
               <label htmlFor="Contraseña">Contraseña</label>
               <input
                 type="password"
                 id="Contraseña"
                 value={Contraseña}
                 onChange={(e) => setContraseña(e.target.value)}
               />
             </div>
             <button className="login-button" type="submit">
               Iniciar Sesión
             </button>
           </form>
         </div>
       </div>
     </div>
  );
 }
 
 export default Login;