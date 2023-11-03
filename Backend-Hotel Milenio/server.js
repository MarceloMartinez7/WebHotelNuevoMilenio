const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 5000;

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

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre del archivo en el sistema de archivos
  }
});

const uploads = multer({ storage: storage });

app.put('/habitacionUpdate/:id', uploads.single('Imagen'), (req, res) => {
  const id = req.params.id;
  const { N_de_habitacion, ID_tipoHabitacion, Num_Cama, ID_Estado, Precio } = req.body;

  // Inicializa la variable para la imagen
  let ImagenHexadecimal = null;

  // Verifica si se ha proporcionado una nueva imagen
  if (req.file) {
    // Convierte el búfer de datos de la imagen en hexadecimal
    if (req.file.buffer) {
      ImagenHexadecimal = req.file.buffer.toString('hex');
    } else {
      console.log('El búfer de la imagen es nulo o indefinido');
    }
  } else {
    console.log('No se proporcionó ninguna imagen en la solicitud');
  }

  // Console logs para depuración
  console.log('ID de habitación:', id);
  console.log('N_de_habitacion:', N_de_habitacion);
  console.log('ID_tipoHabitacion:', ID_tipoHabitacion);
  console.log('Num_Cama:', Num_Cama);
  console.log('ID_Estado:', ID_Estado);
  console.log('Precio:', Precio);
  console.log('Imagen en hexadecimal:', ImagenHexadecimal);

  // Actualiza la base de datos con la nueva información
  const sql = `
    UPDATE Habitacion
    SET N_de_habitacion = ?, ID_tipoHabitacion = ?, Num_Cama = ?, ID_Estado = ?, Precio = ?, Imagenes = ?
    WHERE ID_Habitacion = ?
  `;

  const values = [N_de_habitacion, ID_tipoHabitacion, Num_Cama, ID_Estado, Precio, ImagenHexadecimal, id];

  console.log('SQL:', sql);
  console.log('Valores:', values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro de Habitacion:', err);
      res.status(500).json({ error: 'Error al actualizar el registro de Habitacion' });
    } else {
      res.status(200).json({ message: 'Registro de Habitacion actualizado con éxito' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});
