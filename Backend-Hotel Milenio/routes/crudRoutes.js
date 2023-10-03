const express = require('express');
const router = express.Router();


module.exports = (db) => {
    // Ruta para leer registros
    router.get('/read', (reg, res) => {
        // Utiliza la instancia de la base de datos pasada como parámetro
        // Realizar una consulta SQL para seleccionar todos los registros


        const sql = 'SELECT * FROM Tipo_de_habitacion';


        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error al leer registros:', err);
                res.status(500).json({ error: 'Error al leer registros' });
            } else {
                // Devolver los registros en formato JSON como respuesta
                res.status(200).json(result);
            }
        });
    });
    


    // Ruta para crear un nuevo registro de Tipo_de_habitacion
    router.post('/create', (req, res) => {
        // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
        const { Nombre, Descripcion } = req.body;
        // Verifica si se proporcionaron los datos necesarios
        if (!Nombre) {
            return res.status(400).json({ error: 'El campo "Nombre" es obligatorio' });
        }
        // Realiza la consulta SQL para insertar un nuevo registro de Tipo_de_habitacion
        const sql = `INSERT INTO Tipo_de_habitacion (Nombre, Descripcion) VALUES (?, ?)`;
        const values = [Nombre, Descripcion];
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al insertar registro:', err);
                res.status(500).json({ error: 'Error al insertar registro' });
            } else {
                // Devuelve el ID del nuevo registro como respuesta
                res.status(201).json({ ID_tipoHabitacion: result.insertId });
            }
        });
    });

    // Ruta para actualizar un registro existente de Tipo_de_habitacion por ID
    router.put('/update/:id', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const id = req.params.id;
        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { Nombre, Descripcion } = req.body;
        // Verifica si se proporcionaron los datos necesarios
        if (!Nombre) {
            return res.status(400).json({ error: 'El campo "Nombre" es obligatorio' });
        }
        // Realiza la consulta SQL para actualizar el registro por ID
        const sql = `
        UPDATE Tipo_de_habitacion
        SET Nombre = ?, Descripcion = ?
        WHERE ID_tipoHabitacion = ?
    `;
        const values = [Nombre, Descripcion, id];
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al actualizar el registro:', err);
                res.status(500).json({ error: 'Error al actualizar el registro' });
            } else {
                // Devuelve un mensaje de éxito
                res.status(200).json({ message: 'Registro actualizado con éxito' });
            }
        });
    });


    // Ruta para eliminar un registro existente de Tipo_de_habitacion por ID
    router.delete('/delete/:id', (req, res) => {
        // Obtén el ID del registro a eliminar desde los parámetros de la URL
        const id = req.params.id;
        // Realiza la consulta SQL para eliminar el registro por ID
        const sql = 'DELETE FROM Tipo_de_habitacion WHERE ID_tipoHabitacion = ?';
        // Ejecuta la consulta
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error al eliminar el registro:', err);
                res.status(500).json({ error: 'Error al eliminar el registro' });
            } else {
                // Devuelve un mensaje de éxito
                res.status(200).json({ message: 'Registro eliminado con éxito' });
            }
        });
    });


    // Otras rutas CRUD
    return router;
};