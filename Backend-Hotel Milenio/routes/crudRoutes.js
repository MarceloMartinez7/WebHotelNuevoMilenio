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
                console.error('Error al leer registro:', err);
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

    router.post('/cliente/create', (req, res) => {
        // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
        const { ID_Persona, Procedencia } = req.body;
        // Verifica si se proporcionaron los datos necesarios
        if (!ID_Persona || !Procedencia) {
            return res.status(400).json({ error: 'Los campos "ID_Persona" y "Procedencia" son obligatorios' });
        }
        // Realiza la consulta SQL para insertar un nuevo registro de Cliente
        const sql = `INSERT INTO Cliente (ID_Persona, Procedencia) VALUES (?, ?)`;
        const values = [ID_Persona, Procedencia];
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al insertar registro de Cliente:', err);
                res.status(500).json({ error: 'Error al insertar registro de Cliente' });
            } else {
                // Devuelve el ID del nuevo registro como respuesta
                res.status(201).json({ ID_cliente: result.insertId });
            }
        });
    });
    
    // Ruta para actualizar un registro existente de Cliente por ID
    router.put('/cliente/update/:id', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const id = req.params.id;
        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { ID_Persona, Procedencia } = req.body;
        // Verifica si se proporcionaron los datos necesarios
        if (!ID_Persona || !Procedencia) {
            return res.status(400).json({ error: 'Los campos "ID_Persona" y "Procedencia" son obligatorios' });
        }
        // Realiza la consulta SQL para actualizar el registro de Cliente por ID
        const sql = `
            UPDATE Cliente
            SET ID_Persona = ?, Procedencia = ?
            WHERE ID_cliente = ?
        `;
        const values = [ID_Persona, Procedencia, id];
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al actualizar el registro de Cliente:', err);
                res.status(500).json({ error: 'Error al actualizar el registro de Cliente' });
            } else {
                // Devuelve un mensaje de éxito
                res.status(200).json({ message: 'Registro de Cliente actualizado con éxito' });
            }
        });
    });
    
    // Ruta para eliminar un registro existente de Cliente por ID
    router.delete('/cliente/delete/:id', (req, res) => {
        // Obtén el ID del registro a eliminar desde los parámetros de la URL
        const id = req.params.id;
        // Realiza la consulta SQL para eliminar el registro de Cliente por ID
        const sql = 'DELETE FROM Cliente WHERE ID_cliente = ?';
        // Ejecuta la consulta
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error al eliminar el registro de Cliente:', err);
                res.status(500).json({ error: 'Error al eliminar el registro de Cliente' });
            } else {
                // Devuelve un mensaje de éxito
                res.status(200).json({ message: 'Registro de Cliente eliminado con éxito' });
            }
        });
    });

    router.post('/empleado/create', (req, res) => {
        // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
        const { ID_Persona, Usuario, Contraseña } = req.body;
        // Verifica si se proporcionaron los datos necesarios
        if (!ID_Persona || !Usuario || !Contraseña) {
            return res.status(400).json({ error: 'Los campos "ID_Persona", "Usuario" y "Contraseña" son obligatorios' });
        }
        // Realiza la consulta SQL para insertar un nuevo registro de Empleado
        const sql = `INSERT INTO Empleado (ID_Persona, Usuario, Contraseña) VALUES (?, ?, ?)`;
        const values = [ID_Persona, Usuario, Contraseña];
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al insertar registro de Empleado:', err);
                res.status(500).json({ error: 'Error al insertar registro de Empleado' });
            } else {
                // Devuelve el ID del nuevo registro como respuesta
                res.status(201).json({ ID_Empleado: result.insertId });
            }
        });
    });
    
    // Ruta para actualizar un registro existente de Empleado por ID
    router.put('/empleado/update/:id', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const id = req.params.id;
        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { ID_Persona, Usuario, Contraseña } = req.body;
        // Verifica si se proporcionaron los datos necesarios
        if (!ID_Persona || !Usuario || !Contraseña) {
            return res.status(400).json({ error: 'Los campos "ID_Persona", "Usuario" y "Contraseña" son obligatorios' });
        }
        // Realiza la consulta SQL para actualizar el registro de Empleado por ID
        const sql = `
            UPDATE Empleado
            SET ID_Persona = ?, Usuario = ?, Contraseña = ?
            WHERE ID_Empleado = ?
        `;
        const values = [ID_Persona, Usuario, Contraseña, id];
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al actualizar el registro de Empleado:', err);
                res.status(500).json({ error: 'Error al actualizar el registro de Empleado' });
            } else {
                // Devuelve un mensaje de éxito
                res.status(200).json({ message: 'Registro de Empleado actualizado con éxito' });
            }
        });
    });
    
   // Ruta para eliminar un registro existente de Empleado por ID
router.delete('/empleado/delete/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;
    // Realiza la consulta SQL para eliminar el registro de Empleado por ID
    const sql = 'DELETE FROM Empleado WHERE ID_Empleado = ?';
    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el registro de Empleado:', err);
            res.status(500).json({ error: 'Error al eliminar el registro de Empleado' });
        } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro de Empleado eliminado con éxito' });
        }
    });
});


router.post('/habitacion/create', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { ID_Habitacion, N_de_habitacion, ID_tipoHabitacion, Num_Cama, ID_Estado, Precio } = req.body;
    // Verifica si se proporcionaron los datos necesarios
    if (!ID_Habitacion || !N_de_habitacion || !ID_tipoHabitacion || !Num_Cama || !ID_Estado || !Precio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    // Realiza la consulta SQL para insertar un nuevo registro de Habitacion
    const sql = `INSERT INTO Habitacion (ID_Habitacion, N_de_habitacion, ID_tipoHabitacion, Num_Cama, ID_Estado, Precio) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [ID_Habitacion, N_de_habitacion, ID_tipoHabitacion, Num_Cama, ID_Estado, Precio];
    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar registro de Habitacion:', err);
            res.status(500).json({ error: 'Error al insertar registro de Habitacion' });
        } else {
            // Devuelve el ID del nuevo registro como respuesta
            res.status(201).json({ ID_Habitacion: result.insertId });
        }
    });
});

// Ruta para actualizar un registro existente de Habitacion por ID
router.put('/habitacion/update/:id', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id = req.params.id;
    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { N_de_habitacion, ID_tipoHabitacion, Num_Cama, ID_Estado, Precio } = req.body;
    // Verifica si se proporcionaron los datos necesarios
    if (!N_de_habitacion || !ID_tipoHabitacion || !Num_Cama || !ID_Estado || !Precio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    // Realiza la consulta SQL para actualizar el registro de Habitacion por ID
    const sql = `
        UPDATE Habitacion
        SET N_de_habitacion = ?, ID_tipoHabitacion = ?, Num_Cama = ?, ID_Estado = ?, Precio = ?
        WHERE ID_Habitacion = ?
    `;
    const values = [N_de_habitacion, ID_tipoHabitacion, Num_Cama, ID_Estado, Precio, id];
    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el registro de Habitacion:', err);
            res.status(500).json({ error: 'Error al actualizar el registro de Habitacion' });
        } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro de Habitacion actualizado con éxito' });
        }
    });
});

// Ruta para eliminar un registro existente de Habitacion por ID
router.delete('/habitacion/delete/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;
    // Realiza la consulta SQL para eliminar el registro de Habitacion por ID
    const sql = 'DELETE FROM Habitacion WHERE ID_Habitacion = ?';
    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el registro de Habitacion:', err);
            res.status(500).json({ error: 'Error al eliminar el registro de Habitacion' });
        } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro de Habitacion eliminado con éxito' });
        }
    });
});


// Ruta para crear un nuevo registro de ReservacionEstancia
router.post('/reservacion/create', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, EstadoReserva } = req.body;
    // Verifica si se proporcionaron los datos necesarios
    if (!ID_cliente || !F_entrada || !F_salida || !ID_Empleado || !TipoServicio || !EstadoReserva) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    // Realiza la consulta SQL para insertar un nuevo registro de ReservacionEstancia
    const sql = `INSERT INTO ReservacionEstancia (ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, EstadoReserva) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, EstadoReserva];
    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar registro de ReservacionEstancia:', err);
            res.status(500).json({ error: 'Error al insertar registro de ReservacionEstancia' });
        } else {
            // Devuelve el ID del nuevo registro como respuesta
            res.status(201).json({ ID_ReservaEstancia: result.insertId });
        }
    });
});

// Ruta para actualizar un registro existente de ReservacionEstancia por ID
router.put('/reservacion/update/:id', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id = req.params.id;
    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, EstadoReserva } = req.body;
    // Verifica si se proporcionaron los datos necesarios
    if (!ID_cliente || !F_entrada || !F_salida || !ID_Empleado || !TipoServicio || !EstadoReserva) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    // Realiza la consulta SQL para actualizar el registro de ReservacionEstancia por ID
    const sql = `
        UPDATE ReservacionEstancia
        SET ID_cliente = ?, F_entrada = ?, F_salida = ?, ID_Empleado = ?, TipoServicio = ?, EstadoReserva = ?
        WHERE ID_ReservaEstancia = ?
    `;
    const values = [ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, EstadoReserva, id];
    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el registro de ReservacionEstancia:', err);
            res.status(500).json({ error: 'Error al actualizar el registro de ReservacionEstancia' });
        } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro de ReservacionEstancia actualizado con éxito' });
        }
    });
});


// Ruta para eliminar un registro existente de ReservacionEstancia por ID
router.delete('/reservacion/delete/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;
    // Realiza la consulta SQL para eliminar el registro de ReservacionEstancia por ID
    const sql = 'DELETE FROM ReservacionEstancia WHERE ID_ReservaEstancia = ?';
    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el registro de ReservacionEstancia:', err);
            res.status(500).json({ error: 'Error al eliminar el registro de ReservacionEstancia' });
        } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro de ReservacionEstancia eliminado con éxito' });
        }
    });
});





// DETALLE RESERVA
router.post('/detalle/create', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { ID_ReservaEstancia, ID_Habitacion } = req.body;
    // Verifica si se proporcionaron los datos necesarios
    if (!ID_ReservaEstancia || !ID_Habitacion) {
        return res.status(400).json({ error: 'Los campos "ID_ReservaEstancia" e "ID_Habitacion" son obligatorios' });
    }
    // Realiza la consulta SQL para insertar un nuevo registro de DetalleReservacion
    const sql = `INSERT INTO DetalleReservacion (ID_ReservaEstancia, ID_Habitacion) VALUES (?, ?)`;
    const values = [ID_ReservaEstancia, ID_Habitacion];
    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar registro de DetalleReservacion:', err);
            res.status(500).json({ error: 'Error al insertar registro de DetalleReservacion' });
        } else {
            // Devuelve el ID del nuevo registro como respuesta
            res.status(201).json({ ID_DetalleReservacion: result.insertId });
        }
    });
});

// Ruta para actualizar un registro existente de DetalleReservacion por ID
router.put('/detalle/update/:id', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id = req.params.id;
    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { ID_ReservaEstancia, ID_Habitacion } = req.body;
    // Verifica si se proporcionaron los datos necesarios
    if (!ID_ReservaEstancia || !ID_Habitacion) {
        return res.status(400).json({ error: 'Los campos "ID_ReservaEstancia" e "ID_Habitacion" son obligatorios' });
    }
    // Realiza la consulta SQL para actualizar el registro de DetalleReservacion por ID
    const sql = `
        UPDATE DetalleReservacion
        SET ID_ReservaEstancia = ?, ID_Habitacion = ?
        WHERE ID_DetalleReservacion = ?
    `;
    const values = [ID_ReservaEstancia, ID_Habitacion, id];
    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el registro de DetalleReservacion:', err);
            res.status(500).json({ error: 'Error al actualizar el registro de DetalleReservacion' });
        } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro de DetalleReservacion actualizado con éxito' });
        }
    });
});

// Ruta para eliminar un registro existente de DetalleReservacion por ID
router.delete('/detalle/delete/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;
    // Realiza la consulta SQL para eliminar el registro de DetalleReservacion por ID
    const sql = 'DELETE FROM DetalleReservacion WHERE ID_DetalleReservacion = ?';
    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el registro de DetalleReservacion:', err);
            res.status(500).json({ error: 'Error al eliminar el registro de DetalleReservacion' });
        } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro de DetalleReservacion eliminado con éxito' });
        }
    });
});


router.post('/servicios/create', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { ID_Empleado, NombreServicio, DescripcionServicio } = req.body;
    // Verifica si se proporcionaron los datos necesarios
    if (!ID_Empleado || !NombreServicio || !DescripcionServicio) {
        return res.status(400).json({ error: 'Los campos "ID_Empleado", "NombreServicio" y "DescripcionServicio" son obligatorios' });
    }
    // Realiza la consulta SQL para insertar un nuevo registro de SERVICIOS
    const sql = `INSERT INTO SERVICIOS (ID_Empleado, NombreServicio, DescripcionServicio) VALUES (?, ?, ?)`;
    const values = [ID_Empleado, NombreServicio, DescripcionServicio];
    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar registro de SERVICIOS:', err);
            res.status(500).json({ error: 'Error al insertar registro de SERVICIOS' });
        } else {
            // Devuelve el ID del nuevo registro como respuesta
            res.status(201).json({ ID_Servicios: result.insertId });
        }
    });
});

// Ruta para actualizar un registro existente de SERVICIOS por ID
router.put('/servicios/update/:id', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id = req.params.id;
    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { ID_Empleado, NombreServicio, DescripcionServicio } = req.body;
    // Verifica si se proporcionaron los datos necesarios
    if (!ID_Empleado || !NombreServicio || !DescripcionServicio) {
        return res.status(400).json({ error: 'Los campos "ID_Empleado", "NombreServicio" y "DescripcionServicio" son obligatorios' });
    }
    // Realiza la consulta SQL para actualizar el registro de SERVICIOS por ID
    const sql = `
        UPDATE SERVICIOS
        SET ID_Empleado = ?, NombreServicio = ?, DescripcionServicio = ?
        WHERE ID_Servicios = ?
    `;
    const values = [ID_Empleado, NombreServicio, DescripcionServicio, id];
    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el registro de SERVICIOS:', err);
            res.status(500).json({ error: 'Error al actualizar el registro de SERVICIOS' });
        } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro de SERVICIOS actualizado con éxito' });
        }
    });
});

// Ruta para eliminar un registro existente de SERVICIOS por ID
router.delete('/servicios/delete/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;
    // Realiza la consulta SQL para eliminar el registro de SERVICIOS por ID
    const sql = 'DELETE FROM SERVICIOS WHERE ID_Servicios = ?';
    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el registro de SERVICIOS:', err);
            res.status(500).json({ error: 'Error al eliminar el registro de SERVICIOS' });
        } else {
            // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro de SERVICIOS eliminado con éxito' });
        }
    });
});




    // Otras rutas CRUD
    return router;
};