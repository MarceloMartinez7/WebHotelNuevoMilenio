const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json({limit: '50mb'}))

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Yamilg620',
  database: 'db_hotelmilenio',
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Configuración de CORS
app.use(cors());

// Agregar configuración para analizar solicitudes JSON
app.use(express.json());

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});

const crudRoutes = require('./routes/crudRoutes.js')(db);
app.use('/crud', crudRoutes);

// Manejador de errores para errores de análisis JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).send({ error: 'Error en el formato JSON de la solicitud' });
  } else {
    next();
  }
});
