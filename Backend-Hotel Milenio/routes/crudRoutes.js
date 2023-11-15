const express = require('express');
const router = express.Router();





module.exports = (db) => {
    // Ruta para leer registros
    router.get('/TipoHabitacionCombo', (reg, res) => {
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


     // Ruta para leer registros
     router.get('/EstadoCombo', (reg, res) => {
        // Utiliza la instancia de la base de datos pasada como parámetro
        // Realizar una consulta SQL para seleccionar todos los registros


        const sql = 'SELECT * FROM Estado';


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
    router.post('/createTipoHabitacion', (req, res) => {
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



    router.post('/createCliente', (req, res) => {
        // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
        const {
            Cedula,
            Nombre1,
            Nombre2,
            Apellido1,
            Apellido2,
            Telefono,
            Procedencia,
        } = req.body;

        // Verifica si se proporcionaron los datos necesarios
        if (!Cedula || !Nombre1 || !Apellido1 || !Telefono || !Procedencia) {
            return res.status(400).json({ error: 'Los campos "Cedula", "Nombre1", "Apellido1", "Telefono" y "Procedencia" son obligatorios' });
        }

        // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Persona"
        const personaSql = `
            INSERT INTO Persona (Cedula, Nombre1, Nombre2, Apellido1, Apellido2, Telefono)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const personaValues = [Cedula, Nombre1, Nombre2, Apellido1, Apellido2, Telefono];

        // Ejecuta la consulta para insertar en la tabla "Persona"
        db.query(personaSql, personaValues, (err, personaResult) => {
            if (err) {
                console.error('Error al insertar registro de Persona:', err);
                res.status(500).json({ error: 'Error al insertar registro de Persona' });
            } else {
                const ID_Persona = personaResult.insertId; // Obtenemos el ID_Persona recién insertado

                // Realiza la consulta SQL para insertar un nuevo registro de Cliente
                const clienteSql = `INSERT INTO Cliente (ID_Persona, Procedencia)
                    VALUES (?, ?)
                `;
                const clienteValues = [ID_Persona, Procedencia];

                // Ejecuta la consulta para insertar en la tabla "Cliente"
                db.query(clienteSql, clienteValues, (err, clienteResult) => {
                    if (err) {
                        console.error('Error al insertar registro de Cliente:', err);
                        res.status(500).json({ error: 'Error al insertar registro de Cliente' });
                    } else {
                        // Devuelve el ID del nuevo registro de Cliente como respuesta
                        res.status(201).json({ ID_cliente: clienteResult.insertId });
                    }
                });
            }
        });
    });



    router.get('/ListarClientes', (req, res) => {
        // Realiza una consulta SQL para seleccionar todos los registros de Cliente y sus datos relacionados de Persona
        const sql = `
        SELECT Cliente.ID_cliente, Persona.ID_Persona, Persona.Cedula, Persona.Nombre1, Persona.Nombre2, Persona.Apellido1, Persona.Apellido2, Persona.Telefono, Cliente.Procedencia
        FROM Cliente
        INNER JOIN Persona ON Cliente.ID_Persona = Persona.ID_Persona;
        `;

        // Ejecuta la consulta
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error al recuperar registros de Cliente:', err);
                res.status(500).json({ error: 'Error al recuperar registros de Cliente' });
            } else {
                // Devuelve los registros en formato JSON como respuesta
                res.status(200).json(result);
            }
        });
    });


    // Ruta para actualizar un registro existente de Persona por ID
    router.put('/updateCliente/:id', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const id = req.params.id;

        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { Cedula, Nombre1, Nombre2, Apellido1, Apellido2, Telefono } = req.body;

        // Verifica si se proporcionaron los datos necesarios
        if (!Cedula || !Nombre1 || !Apellido1 || !Telefono) {
            return res.status(400).json({ error: 'Los campos "Cedula," "Nombre1," "Apellido1," y "Telefono" son obligatorios' });
        }

        // Realiza la consulta SQL para actualizar el registro de Persona por ID
        const sql = `
        UPDATE Persona
        SET Cedula = ?, Nombre1 = ?, Nombre2 = ?, Apellido1 = ?, Apellido2 = ?, Telefono = ?
        WHERE ID_Persona = ?
    `;

        const values = [Cedula, Nombre1, Nombre2, Apellido1, Apellido2, Telefono, id];

        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al actualizar el registro de Persona:', err);
                res.status(500).json({ error: 'Error al actualizar el registro de Persona' });
            } else {
                // Devuelve un mensaje de éxito
                res.status(200).json({ message: 'Registro de Persona actualizado con éxito' });
            }
        });
    });



    // Ruta para eliminar un registro existente de Cliente y Persona por ID
    router.delete('/deleteCliente/:idCliente/:idPersona', (req, res) => {
        // Obtén el ID del registro de Cliente y de la Persona a eliminar desde los parámetros de la URL
        const idCliente = req.params.idCliente;
        const idPersona = req.params.idPersona;

        // Realiza la consulta SQL para eliminar el registro de Cliente por ID
        const clienteSql = 'DELETE FROM Cliente WHERE ID_cliente = ?';

        // Realiza la consulta SQL para eliminar el registro de Persona por ID
        const personaSql = 'DELETE FROM Persona WHERE ID_Persona = ?';

        // Ejecuta la consulta para eliminar el registro de Cliente
        db.query(clienteSql, [idCliente], (err, result) => {
            if (err) {
                console.error('Error al eliminar el registro de Cliente:', err);
                res.status(500).json({ error: 'Error al eliminar el registro de Cliente' });
            } else {
                // Ejecuta la consulta para eliminar el registro de Persona
                db.query(personaSql, [idPersona], (err, result) => {
                    if (err) {
                        console.error('Error al eliminar el registro de Persona:', err);
                        res.status(500).json({ error: 'Error al eliminar el registro de Persona' });
                    } else {
                        // Devuelve un mensaje de éxito
                        res.status(200).json({ message: 'Registro de Cliente y Persona eliminados con éxito' });
                    }
                });
            }
        });
    });




    router.post('/createEmpleado', (req, res) => {
        // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
        const { Nombre1, Nombre2, Apellido1, Apellido2, Telefono, Usuario, Contraseña } = req.body;

        // Verifica si se proporcionaron los datos necesarios
        if (!Nombre1 || !Apellido1 || !Telefono || !Usuario || !Contraseña) {
            return res.status(400).json({ error: 'Los campos "Nombre1", "Apellido1", "Telefono", "Usuario" y "Contraseña" son obligatorios' });
        }

        // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Persona"
        const personaSql = `
            INSERT INTO Persona (Nombre1, Nombre2, Apellido1, Apellido2, Telefono)
            VALUES (?, ?, ?, ?, ?)
        `;
        const personaValues = [Nombre1, Nombre2, Apellido1, Apellido2, Telefono];

        // Ejecuta la consulta para insertar en la tabla "Persona"
        db.query(personaSql, personaValues, (err, personaResult) => {
            if (err) {
                console.error('Error al insertar registro de Persona:', err);
                res.status(500).json({ error: 'Error al insertar registro de Persona' });
            } else {
                const ID_Persona = personaResult.insertId; // Obtenemos el ID_Persona recién insertado

                // Realiza la consulta SQL para insertar un nuevo registro de Empleado
                const empleadoSql = `INSERT INTO Empleado (ID_Persona, Usuario, Contraseña)
                    VALUES (?, ?, ?)
                `;
                const empleadoValues = [ID_Persona, Usuario, Contraseña];

                // Ejecuta la consulta para insertar en la tabla "Empleado"
                db.query(empleadoSql, empleadoValues, (err, empleadoResult) => {
                    if (err) {
                        console.error('Error al insertar registro de Empleado:', err);
                        res.status(500).json({ error: 'Error al insertar registro de Empleado' });
                    } else {
                        // Devuelve el ID del nuevo registro de Empleado como respuesta
                        res.status(201).json({ ID_Empleado: empleadoResult.insertId });
                    }
                });
            }
        });
    });



    router.get('/ListarEmpleado', (req, res) => {
        // Realiza una consulta SQL para seleccionar todos los registros de Cliente y sus datos relacionados de Persona
        const sql = `
        SELECT Empleado.ID_Empleado, Persona.ID_Persona,  Persona.Nombre1, Persona.Nombre2, Persona.Apellido1, Persona.Apellido2, Persona.Telefono, Empleado.Usuario,Empleado.Contraseña
          FROM Empleado
          INNER JOIN Persona ON Empleado.ID_Persona = Persona.ID_Persona;
        `;

        // Ejecuta la consulta
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error al recuperar registros de Empleado:', err);
                res.status(500).json({ error: 'Error al recuperar registros de Empleado' });
            } else {
                // Devuelve los registros en formato JSON como respuesta
                res.status(200).json(result);
            }
        });
    });




    // Ruta para actualizar un registro existente de Persona por ID
    router.put('/updateEmpleado/:id', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const id = req.params.id;

        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { Nombre1, Nombre2, Apellido1, Apellido2, Telefono, Usuario, Contraseña } = req.body;

        // Verifica si se proporcionaron los datos necesarios
        if (!Nombre1 || !Apellido1 || !Telefono) {
            return res.status(400).json({ error: 'Los campos "Nombre1," "Apellido1," y "Telefono" son obligatorios' });
        }

        // Realiza la consulta SQL para actualizar el registro de Persona por ID
        const sql = `
    UPDATE Persona
    SET  Nombre1 = ?, Nombre2 = ?, Apellido1 = ?, Apellido2 = ?, Telefono = ?
    WHERE ID_Persona = ?
`;

        const values = [Nombre1, Nombre2, Apellido1, Apellido2, Telefono, id];

        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al actualizar el registro de Persona:', err);
                res.status(500).json({ error: 'Error al actualizar el registro de Persona' });
            } else {
                // Devuelve un mensaje de éxito
                res.status(200).json({ message: 'Registro de Persona actualizado con éxito' });
            }
        });
    });


    // Ruta para eliminar un registro existente de Cliente y Persona por ID
    router.delete('/deleteEmpleado/:idEmpleado/:idPersona', (req, res) => {
        // Obtén el ID del registro de Cliente y de la Persona a eliminar desde los parámetros de la URL
        const idEmpleado = req.params.idEmpleado;
        const idPersona = req.params.idPersona;

        // Realiza la consulta SQL para eliminar el registro de Empleado por ID
        const empleadoSql = 'DELETE FROM Empleado WHERE ID_Empleado = ?';

        // Realiza la consulta SQL para eliminar el registro de Persona por ID
        const personaSql = 'DELETE FROM Persona WHERE ID_Persona = ?';

        // Ejecuta la consulta para eliminar el registro de Empleado
        db.query(empleadoSql, [idEmpleado], (err, result) => {
            if (err) {
                console.error('Error al eliminar el registro de Empleado:', err);
                res.status(500).json({ error: 'Error al eliminar el registro de Empleado' });
            } else {
                // Ejecuta la consulta para eliminar el registro de Persona
                db.query(personaSql, [idPersona], (err, result) => {
                    if (err) {
                        console.error('Error al eliminar el registro de Persona:', err);
                        res.status(500).json({ error: 'Error al eliminar el registro de Persona' });
                    } else {
                        // Devuelve un mensaje de éxito
                        res.status(200).json({ message: 'Registro de Empleado y Persona eliminados con éxito' });
                    }
                });
            }
        });
    });




    // Ruta para leer registros
    router.get('/ComboEmpleado', (reg, res) => {



        const sql = 'SELECT E.ID_Empleado, P.Nombre1 AS NombreEmpleado FROM Empleado AS E INNER JOIN Persona AS P ON E.ID_Persona = P.ID_Persona';


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


    router.post('/createHabitacion', (req, res) => {
        // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
        const { ID_Habitacion, N_de_habitacion, ID_tipoHabitacion, Num_Cama, ID_Estado, Precio, Imagenes } = req.body;
    
        // Verifica si se proporcionaron los datos necesarios
        if (!ID_Habitacion || !N_de_habitacion || !ID_tipoHabitacion || !Num_Cama || !ID_Estado || !Precio ) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Habitacion"
        const habitacionSql = `
            INSERT INTO Habitacion (ID_Habitacion, N_de_habitacion, ID_tipoHabitacion, Num_Cama, ID_Estado, Precio, Imagenes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const habitacionValues = [ID_Habitacion, N_de_habitacion, ID_tipoHabitacion, Num_Cama, ID_Estado, Precio, Imagenes];
    
        // Ejecuta la consulta para insertar en la tabla "Habitacion"
        db.query(habitacionSql, habitacionValues, (err, habitacionResult) => {
            if (err) {
                console.error('Error al insertar registro de Habitacion:', err);
                res.status(500).json({ error: 'Error al insertar registro de Habitacion' });
            } else {
                // Devuelve el ID de la nueva habitación como respuesta
                res.status(201).json({ ID_Habitacion: habitacionResult.insertId });
            }
        });
    });
    




    router.put('/habitacionChangeStateDisponible/:id', (req, res) => {
        const id = req.params.id;
    
        const sql = `
            UPDATE Habitacion
            SET ID_Estado = 1
            WHERE ID_Habitacion = ?
        `;
        const values = [id];
    
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al cambiar el estado de la habitación a Disponible:', err);
                res.status(500).json({ error: 'Error al cambiar el estado de la habitación a Disponible' });
            } else {
                res.status(200).json({ message: 'Estado de la habitación cambiado a Disponible con éxito' });
            }
        });
    });
    


    router.put('/habitacionChangeStateSucio/:id', (req, res) => {
        const id = req.params.id;
    
        const sql = `
            UPDATE Habitacion
            SET ID_Estado = 3
            WHERE ID_Habitacion = ?
        `;
        const values = [id];
    
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error al cambiar el estado de la habitación a Sucio:', err);
                res.status(500).json({ error: 'Error al cambiar el estado de la habitación a Sucio' });
            } else {
                res.status(200).json({ message: 'Estado de la habitación cambiado a Sucio con éxito' });
            }
        });
    });
    


// Ruta para actualizar un registro existente de Habitacion por ID
router.put('/habitacionUpdate/:id', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id = req.params.id;
    
    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { N_de_habitacion, ID_tipoHabitacion, Num_Cama,  Precio, Imagenes } = req.body;
    
    // Verifica si se proporcionaron los datos necesarios
    if (!N_de_habitacion || !ID_tipoHabitacion || !Num_Cama ||  !Precio) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
    }
    
    // Realiza la consulta SQL para actualizar el registro de Habitacion por ID
    const sql = `
        UPDATE Habitacion
        SET N_de_habitacion = ?, ID_tipoHabitacion = ?, Num_Cama = ?,  Precio = ?, Imagenes = ?
        WHERE ID_Habitacion = ?
    `;
    const values = [N_de_habitacion, ID_tipoHabitacion, Num_Cama,  Precio, Imagenes, id];
    
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
 


router.get('/ListarHabitaciones', (req, res) => {
    const sql = `
        SELECT
            Habitacion.ID_Habitacion,
            Habitacion.N_de_habitacion,
            Tipo_de_habitacion.Nombre AS Tipo_Habitacion,
            Habitacion.Num_Cama,
            Estado.NombreEstado AS Estado_Habitacion,
            Habitacion.Precio,
            Habitacion.Imagenes
        FROM
            Habitacion
        INNER JOIN
            Tipo_de_habitacion ON Habitacion.ID_tipoHabitacion = Tipo_de_habitacion.ID_tipoHabitacion
        INNER JOIN
            Estado ON Habitacion.ID_Estado = Estado.ID_Estado
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al recuperar registros de Habitacion:', err);
            res.status(500).json({ error: 'Error al recuperar registros de Habitacion' });
        } else {
            res.status(200).json(result);
        }
    });
});








    router.delete('/habitacion/delete/:id', (req, res) => {
        // Obtén el ID de la habitación a eliminar desde los parámetros de la URL
        const id = req.params.id;
        // Realiza la consulta SQL para eliminar la habitación por su ID
        const sql = 'DELETE FROM Habitacion WHERE ID_Habitacion = ?';
        // Ejecuta la consulta
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error al eliminar la habitación:', err);
                res.status(500).json({ error: 'Error al eliminar la habitación' });
            } else {
                res.status(200).json({ message: 'Habitación eliminada con éxito' });
            }
        });
    });





    // Ruta para leer registros de Habitación para el comb
    router.get('/ComboHabitacion', (req, res) => {
        const sql = 'SELECT Habitacion.ID_Habitacion, Habitacion.N_de_habitacion, Tipo_de_habitacion.Nombre AS NombreHabitacion, Habitacion.Num_Cama, Estado.NombreEstado AS EstadoHabitacion, Habitacion.Precio FROM Habitacion INNER JOIN Tipo_de_habitacion ON Habitacion.ID_tipoHabitacion = Tipo_de_habitacion.ID_tipoHabitacion INNER JOIN Estado ON Habitacion.ID_Estado = Estado.ID_Estado';


        // Ejecutar la consulta
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error al leer registros de Habitación:', err);
                res.status(500).json({ error: 'Error al leer registros' });
            } else {
                // Devolver los registros en formato JSON como respuesta
                res.status(200).json(result);
            }
        });
    });






    




    router.post('/reservacionCreate', (req, res) => {
        const { ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, habitaciones } = req.body;

        if (!ID_cliente || !F_entrada || !F_salida || !ID_Empleado || !TipoServicio || (!habitaciones || habitaciones.length === 0)) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios, y al menos una habitación debe ser seleccionada' });
        }

        db.beginTransaction(function (err) {
            if (err) {
                return res.status(500).json({ error: 'Error al iniciar la transacción' });
            }

            const reservaIDs = []; // Array para almacenar los IDs de las reservas de habitaciones

            // Itera a través de las habitaciones y registra cada una
            const insertReserva = () => {
                const habitacion = habitaciones.pop();
                const reservaSql = `INSERT INTO ReservacionEstancia (ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, EstadoReserva) VALUES (?, ?, ?, ?, ?, ?)`;
                const reservaValues = [ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, 'Activo'];

                db.query(reservaSql, reservaValues, (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Error al insertar registro de ReservacionEstancia' });
                        });
                    }

                    const reservaID = result.insertId;
                    reservaIDs.push(reservaID);

                    const updateHabitacionSql = `UPDATE Habitacion SET ID_Estado = ? WHERE ID_Habitacion = ?`;
                    const updateHabitacionValues = [2, habitacion];

                    db.query(updateHabitacionSql, updateHabitacionValues, (err, result) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Error al actualizar el estado de la habitación' });
                            });
                        }

                        // Insertar un nuevo registro en DetalleReservacion con el ID de reserva y el ID de la habitación
                        const detalleSql = `INSERT INTO DetalleReservacion (ID_ReservaEstancia, ID_Habitacion) VALUES (?, ?)`;
                        const detalleValues = [reservaID, habitacion];

                        db.query(detalleSql, detalleValues, (err, result) => {
                            if (err) {
                                return db.rollback(() => {
                                    res.status(500).json({ error: 'Error al insertar registro en DetalleReservacion' });
                                });
                            }

                            if (habitaciones.length > 0) {
                                insertReserva(); // Procesar la siguiente habitación
                            } else {
                                db.commit((err) => {
                                    if (err) {
                                        return db.rollback(() => {
                                            res.status(500).json({ error: 'Error al confirmar la transacción' });
                                        });
                                    }

                                    res.status(201).json({ ID_ReservaEstancias: reservaIDs });
                                });
                            }
                        });
                    });
                });
            };

            insertReserva(); // Iniciar el proceso de registro de habitaciones
        });
    });



    router.get('/ListarReservaciones', (req, res) => {
        // Realiza una consulta SQL para seleccionar todos los registros de Habitacion y sus datos relacionados de Tipo_de_habitacion y Estado

        const sql = `
    SELECT
    RE.ID_ReservaEstancia,
    DR.ID_DetalleReservacion,
    P.Nombre1 AS Nombre,
    P.Apellido1 AS Apellido,
    P.Cedula,
    RE.F_entrada,
    RE.F_salida,
    RE.TipoServicio,
    RE.EstadoReserva,
    H.N_de_habitacion,
    CONCAT(EP.Nombre1, ' ', EP.Apellido1) AS NombreEmpleado
FROM
    ReservacionEstancia RE
    INNER JOIN DetalleReservacion DR ON RE.ID_ReservaEstancia = DR.ID_ReservaEstancia
    INNER JOIN Cliente C ON RE.ID_cliente = C.ID_cliente
    INNER JOIN Empleado E ON RE.ID_Empleado = E.ID_Empleado
    INNER JOIN Persona P ON C.ID_Persona = P.ID_Persona
    INNER JOIN Persona EP ON E.ID_Persona = EP.ID_Persona
    INNER JOIN Habitacion H ON DR.ID_Habitacion = H.ID_Habitacion;
    `;





        // Ejecuta la consulta
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error al recuperar registros de Habitacion:', err);
                res.status(500).json({ error: 'Error al recuperar registros de Habitacion' });
            } else {
                // Devuelve los registros en formato JSON como respuesta
                res.status(200).json(result);
            }
        });
    });





    router.put('/reservacionUpdate/:id', (req, res) => {
        const idReserva = req.params.id;
        const { F_entrada, F_salida, TipoServicio } = req.body;

        if (!F_entrada || !F_salida || !TipoServicio) {
            return res.status(400).json({ error: 'F_entrada, F_salida y TipoServicio son campos obligatorios' });
        }

        const updateReservacionSql = `UPDATE ReservacionEstancia
        SET F_entrada = ?, F_salida = ?, TipoServicio = ?
        WHERE ID_ReservaEstancia = ?`;

        const updateReservacionValues = [F_entrada, F_salida, TipoServicio, idReserva];

        db.query(updateReservacionSql, updateReservacionValues, (err, result) => {
            if (err) {
                console.error('Error al actualizar la reservación:', err);
                return res.status(500).json({ error: 'Error al actualizar la reservación' });
            }

            res.status(200).json({ message: 'Reservación actualizada con éxito' });
        });
    });



    // Ruta para eliminar un registro de ReservacionEstancia por ID
    router.delete('/deletereserva/:id', (req, res) => {
        const idReserva = req.params.id;

        db.beginTransaction(function (err) {
            if (err) {
                return res.status(500).json({ error: 'Error al iniciar la transacción' });
            }

            // Eliminar los registros correspondientes en DetalleReservacion
            const deleteDetalleReservacionSql = `DELETE FROM DetalleReservacion WHERE ID_ReservaEstancia = ?`;

            db.query(deleteDetalleReservacionSql, [idReserva], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Error al eliminar los registros de DetalleReservacion' });
                    });
                }

                // Ahora que los registros en DetalleReservacion se han eliminado con éxito, procedemos a eliminar la reserva
                const deleteReservacionSql = `DELETE FROM ReservacionEstancia WHERE ID_ReservaEstancia = ?`;

                db.query(deleteReservacionSql, [idReserva], (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Error al eliminar el registro de ReservacionEstancia' });
                        });
                    }

                    // Commit la transacción si todo se hizo correctamente
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Error al confirmar la transacción' });
                            });
                        }

                        res.status(200).json({ message: 'Registro de ReservacionEstancia eliminado con éxito' });
                    });
                });
            });
        });
    });



    // Ruta para cambiar el estado de una reserva a "Cancelado"
    router.put('/cancelarReserva/:id', (req, res) => {
        const idReserva = req.params.id;

        // Realiza una consulta SQL para actualizar el estado de la reserva
        const updateReservaSql = `UPDATE ReservacionEstancia SET EstadoReserva = 'Cancelado' WHERE ID_ReservaEstancia = ?`;

        db.query(updateReservaSql, [idReserva], (err, result) => {
            if (err) {
                console.error('Error al cambiar el estado de la reserva:', err);
                return res.status(500).json({ error: 'Error al cambiar el estado de la reserva' });
            }

            res.status(200).json({ message: 'Estado de la reserva cambiado a "Cancelado"' });
        });
    });


    // Ruta para leer la tabla Categoria de la Base de Datos, empleando procedimientos almacenados

    router.get('/VerServicios', (req, res) => {
        // Nombre del procedimiento almacenado
        const storedProcedure = 'VerServiciosEmpleados';

        // Llama al procedimiento almacenado
        db.query(`CALL ${storedProcedure}`, (err, result) => {
            if (err) {
                console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
                res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
            } else {
                // Devolver los registros en formato JSON como respuesta
                res.status(200).json(result[0]); // Los resultados están en el primer elemento del array result
            }
        });
    });



    router.post('/createServicios', (req, res) => {
        // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
        const { ID_Empleado, NombreServicio, DescripcionServicio } = req.body;

        // Verifica si se proporcionaron los datos necesarios
        if (!ID_Empleado || !NombreServicio || !DescripcionServicio) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Nombre del procedimiento almacenado
        const storedProcedure = 'GuardarServicio';

        // Llama al procedimiento almacenado
        db.query(
            `CALL ${storedProcedure}(?, ?, ?)`,
            [ID_Empleado, NombreServicio, DescripcionServicio],
            (err, result) => {
                if (err) {
                    console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
                    res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
                } else {
                    // Devuelve un mensaje como respuesta
                    res.status(200).json({ message: 'Registro agregado exitosamente' });
                }
            }
        );
    });



    router.put('/updateServicios/:ID_Servicios', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const ID_Servicios = req.params.ID_Servicios;

        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { NombreServicio, DescripcionServicio } = req.body; // Corregido aquí

        // Verifica si se proporcionaron los datos necesarios
        if (!NombreServicio || !DescripcionServicio) { // Corregido aquí
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Nombre del procedimiento almacenado
        const storedProcedure = 'EditarServicio';

        // Llama al procedimiento almacenado
        db.query(
            `CALL ${storedProcedure}(?, ?, ?)`,
            [ID_Servicios, NombreServicio, DescripcionServicio],
            (err, result) => {
                if (err) {
                    console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
                    res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
                } else {
                    // Devuelve un mensaje de éxito
                    res.status(200).json({ message: 'Registro actualizado exitosamente' });
                }
            }
        );
    });




    // Ruta para eliminar registros en la tabla Categoria de la Base de Datos, empleando procedimientos almacenados

    router.delete('/deleteServicio/:ID_Servicios', (req, res) => {
        // Obtén el ID del registro a eliminar desde los parámetros de la URL
        const ID_Servicios = req.params.ID_Servicios;

        // Nombre del procedimiento almacenado
        const storedProcedure = 'EliminarServicio';

        // Llama al procedimiento almacenado
        db.query(`CALL ${storedProcedure}(?)`, [ID_Servicios], (err, result) => {
            if (err) {
                console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
                res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
            } else {
                // Devuelve un mensaje de éxito
                res.status(200).json({ message: 'Registro eliminado exitosamente' });
            }
        });
    });



    // Ruta para el inicio de sesión
router.post('/login', (req, res) => {
    const { Usuario, Contraseña } = req.body;

    // Verifica si los campos de Usuario y Contraseña se proporcionan en el cuerpo de la solicitud
    if (!Usuario || !Contraseña) {
      return res.status(400).json({ error: 'Usuario y Contraseña son campos obligatorios' });
    }

    // Consulta la base de datos para verificar las credenciales del usuario
    const query = 'SELECT * FROM Empleado WHERE Usuario = ? AND Contraseña = ?';
    db.query(query, [Usuario, Contraseña], (err, results) => {
      if (err) {
        console.error('Error al verificar las credenciales:', err);
        return res.status(500).json({ error: 'Error al verificar las credenciales' });
      }

      // Comprueba si se encontró un empleado con las credenciales proporcionadas
      if (results.length === 1) {
        // Autenticación exitosa, devuelve un mensaje de éxito
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        // Credenciales incorrectas
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    });
  });






    //-----------------------------------------------------------

   // Ruta para leer registros
router.get('/RegistroEstadistica', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para obtener el total de reservaciones por día de la semana

    const sql = `
        SELECT
            CASE DAYOFWEEK(F_entrada)
                WHEN 1 THEN 'Domingo'
                WHEN 2 THEN 'Lunes'
                WHEN 3 THEN 'Martes'
                WHEN 4 THEN 'Miércoles'
                WHEN 5 THEN 'Jueves'
                WHEN 6 THEN 'Viernes'
                WHEN 7 THEN 'Sábado'
            END AS DiaSemana,
            COUNT(*) AS TotalReservaciones
        FROM ReservacionEstancia
        GROUP BY DiaSemana
        ORDER BY MIN(DAYOFWEEK(F_entrada));
    `;

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


    // Otras rutas CRUD
    return router;
};