// About.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';


function About() {
 return (
    <div className="About">
      <Header />
      <div className="Informacion">
        <p>
          En un mundo cada vez más interconectado, la labor del ingeniero en
          sistemas se erige como fundamental para el progreso tecnológico y la
          resolución de desafíos complejos. Imagina a José Yamil García Romero
          y Marcelo Enrique Rocha, dos apasionados ingenieros en sistemas con
          visiones innovadoras y fervor por la excelencia tecnológica.
        </p>
        <p>
          Desde sus primeros días de estudios en la Universidad Tecnológica de
          Ciudad Innovadora, José y Marcelo demostraron talento excepcional para
          el diseño de software. Su curiosidad insaciable los llevó a explorar
          las últimas tendencias en inteligencia artificial, desarrollo web y
          ciberseguridad.
        </p>
        <p>
          José, con su enfoque meticuloso, se destacó en la optimización de
          algoritmos, contribuyendo a la eficiencia de sistemas de gestión de
          bases de datos. Por otro lado, Marcelo, con su creatividad sin límites,
          se destacó en la creación de interfaces intuitivas que mejoraron la
          experiencia del usuario a quien va dirigido este sistema web.
        </p>
      </div>
    </div>
 );
}

export default About;