USE db_hotelmilenio
-- PROCEDIMIENTO PARA MOSTRAR CLIENTES
DELIMITER //

CREATE PROCEDURE MostrarClientes()
BEGIN
    -- Muestra la información de los clientes
    SELECT P.ID_Persona, C.ID_cliente, P.Cedula, P.Nombre1, P.Nombre2, P.Apellido1, P.Apellido2, P.Telefono, C.Procedencia
    FROM Persona P
    INNER JOIN Cliente C ON P.ID_Persona = C.ID_Persona;
END;
//

-- PROCEDIMIENTO PARA CONSULTAR CLIENTES
DELIMITER //

CREATE PROCEDURE ConsultarClientes(IN dato VARCHAR(50))
BEGIN
    -- Consulta clientes por diferentes criterios
    SELECT Cliente.ID_cliente, Persona.Cedula, Persona.Nombre1, Persona.Nombre2, Persona.Apellido1, Persona.Apellido2, Persona.Telefono, Cliente.Procedencia
    FROM Cliente
    INNER JOIN Persona ON Cliente.ID_Persona = Persona.ID_Persona
    WHERE Cliente.ID_cliente LIKE CONCAT('%', dato, '%') 
        OR Persona.Cedula LIKE CONCAT('%', dato, '%')
        OR Persona.Nombre1 LIKE CONCAT('%', dato, '%')
        OR Persona.Nombre2 LIKE CONCAT('%', dato, '%')
        OR Persona.Apellido1 LIKE CONCAT('%', dato, '%')
        OR Persona.Apellido2 LIKE CONCAT('%', dato, '%');
END;
//

-- PROCEDIMIENTO PARA VERIFICAR CÉDULA
DELIMITER //

CREATE PROCEDURE VerificarCedula(IN cedula VARCHAR(19), OUT existe BIT)
BEGIN
    -- Verifica si una cédula existe en la base de datos
    SET existe = 0;
  
    IF EXISTS (SELECT 1 FROM Persona WHERE Cedula = cedula) THEN
        SET existe = 1;
    END IF;
END;
//

-- PROCEDIMIENTO PARA CREAR CLIENTE
DELIMITER //

CREATE PROCEDURE CrearCliente(
    IN cedula VARCHAR(19),
    IN nombre1 VARCHAR(15),
    IN nombre2 VARCHAR(15),
    IN apellido1 VARCHAR(15),
    IN apellido2 VARCHAR(15),
    IN procedencia VARCHAR(40),
    IN telefono VARCHAR(9)
)
BEGIN
    -- Crea un nuevo cliente y lo relaciona con una persona
    INSERT INTO Persona(Cedula, Nombre1, Nombre2, Apellido1, Apellido2, Telefono)
    VALUES (cedula, nombre1, nombre2, apellido1, apellido2, telefono);

    INSERT INTO Cliente(ID_Persona, Procedencia)
    VALUES (LAST_INSERT_ID(), procedencia);
END;
//

-- PROCEDIMIENTO PARA MODIFICAR CLIENTE
DELIMITER //

CREATE PROCEDURE ModificarCliente(
    IN id_persona INT,
    IN cedula VARCHAR(19),
    IN nombre1 VARCHAR(15),
    IN nombre2 VARCHAR(15),
    IN apellido1 VARCHAR(15),
    IN apellido2 VARCHAR(15),
    IN procedencia VARCHAR(40),
    IN telefono VARCHAR(9)
)
BEGIN
    -- Modifica los datos de un cliente y su relación con una persona
    UPDATE Persona
    SET
        Cedula = cedula,
        Nombre1 = nombre1,
        Nombre2 = nombre2,
        Apellido1 = apellido1,
        Apellido2 = apellido2,
        Telefono = telefono
    WHERE ID_Persona = id_persona;

    UPDATE Cliente
    SET Procedencia = procedencia
    WHERE ID_Persona = id_persona;
END;
//

-- PROCEDIMIENTO PARA ELIMINAR CLIENTE
DELIMITER //

CREATE PROCEDURE EliminarCliente(IN id_persona INT)
BEGIN
    -- Elimina un cliente y su relación con una persona
    DELETE FROM Cliente WHERE ID_Persona = id_persona;
    DELETE FROM Persona WHERE ID_Persona = id_persona;
END;
//

-- PROCEDIMIENTO PARA CREAR EMPLEADO
DELIMITER //

CREATE PROCEDURE CrearEmpleado(
    IN nombre1 VARCHAR(15),
    IN nombre2 VARCHAR(15),
    IN apellido1 VARCHAR(15),
    IN apellido2 VARCHAR(15),
    IN telefono VARCHAR(9),
    IN usuario VARCHAR(15),
    IN contrasena VARCHAR(30)
)
BEGIN
    -- Crea un nuevo empleado y lo relaciona con una persona
    INSERT INTO Persona(Nombre1, Nombre2, Apellido1, Apellido2, Telefono)
    VALUES (nombre1, nombre2, apellido1, apellido2, telefono);

    INSERT INTO Empleado(ID_Persona, Usuario, Contraseña)
    VALUES (LAST_INSERT_ID(), usuario, contrasena);
END;
//

-- PROCEDIMIENTO PARA MOSTRAR EMPLEADOS
DELIMITER //

CREATE PROCEDURE MostrarEmpleados()
BEGIN
    -- Muestra la información de los empleados
    SELECT P.ID_Persona, E.ID_Empleado, P.Nombre1, P.Nombre2, P.Apellido1, P.Apellido2, P.Telefono, E.Usuario, E.Contraseña
    FROM Persona P
    INNER JOIN Empleado E ON P.ID_Persona = E.ID_Persona;
END;
//

-- PROCEDIMIENTO PARA CONSULTAR EMPLEADO
DELIMITER //

CREATE PROCEDURE ConsultarEmpleado(IN dato VARCHAR(50))
BEGIN
    -- Consulta empleados por diferentes criterios
    SELECT E.ID_Empleado, P.Nombre1, P.Nombre2, P.Apellido1, P.Apellido2, P.Telefono, E.Usuario, E.Contraseña
    FROM Empleado E
    INNER JOIN Persona P ON E.ID_Persona = P.ID_Persona
    WHERE E.ID_Empleado LIKE CONCAT('%', dato, '%')
        OR P.Nombre1 LIKE CONCAT('%', dato, '%')
        OR P.Nombre2 LIKE CONCAT('%', dato, '%')
        OR P.Apellido1 LIKE CONCAT('%', dato, '%')
        OR P.Apellido2 LIKE CONCAT('%', dato, '%');
END;
//

-- PROCEDIMIENTO PARA MOSTRAR HABITACIÓN
DELIMITER //

CREATE PROCEDURE MostrarHabitacion()
BEGIN
    -- Muestra la información de las habitaciones
    SELECT H.ID_Habitacion, H.N_de_habitacion, T.Nombre, T.Descripcion, H.Num_Cama, H.Estado, H.Precio,
           CASE
               WHEN H.Estado = 'Disponible' THEN ''
               ELSE DATE_FORMAT(RE.F_entrada, '%d/%m/%Y')
           END AS F_entrada,
           CASE
               WHEN H.Estado = 'Disponible' THEN ''
               ELSE DATE_FORMAT(RE.F_salida, '%d/%m/%Y')
           END AS F_salida
    FROM Habitacion H
    INNER JOIN Tipo_de_habitacion T ON H.ID_tipoHabitacion = T.ID_tipoHabitacion
    LEFT JOIN DetalleReservacion DR ON H.ID_Habitacion = DR.ID_Habitacion
    LEFT JOIN ReservacionEstancia RE ON DR.ID_ReservaEstancia = RE.ID_ReservaEstancia;
END;
//

-- PROCEDIMIENTO PARA CONSULTAR HABITACIÓN
DELIMITER //

CREATE PROCEDURE ConsultarHabitacion(IN dato VARCHAR(50))
BEGIN
    -- Consulta habitaciones por diferentes criterios
    SELECT H.ID_Habitacion, H.N_de_habitacion, T.Nombre, T.Descripcion, H.Num_Cama,
    H.Estado, H.Precio, RE.ID_ReservaEstancia,
    CASE
               WHEN H.Estado = 'Disponible' THEN ''
               ELSE DATE_FORMAT(RE.F_entrada, '%d/%m/%Y')
           END AS F_entrada,
           CASE
               WHEN H.Estado = 'Disponible' THEN ''
               ELSE DATE_FORMAT(RE.F_salida, '%d/%m/%Y')
           END AS F_salida
    FROM Habitacion H
    INNER JOIN Tipo_de_habitacion T ON H.ID_tipoHabitacion = T.ID_tipoHabitacion
    LEFT JOIN (
        SELECT DR.ID_Habitacion, RE.F_entrada, RE.F_salida, RE.ID_ReservaEstancia
        FROM DetalleReservacion DR
        INNER JOIN ReservacionEstancia RE ON DR.ID_ReservaEstancia = RE.ID_ReservaEstancia
    ) AS RE ON H.ID_Habitacion = RE.ID_Habitacion
    WHERE H.ID_Habitacion LIKE CONCAT('%', dato, '%')
    OR H.N_de_habitacion LIKE CONCAT('%', dato, '%')
    OR H.Estado LIKE CONCAT('%', dato, '%')
    OR DATE_FORMAT(RE.F_entrada, '%d/%m/%Y') LIKE CONCAT('%', dato, '%')
    OR DATE_FORMAT(RE.F_salida, '%d/%m/%Y') LIKE CONCAT('%', dato, '%');
END;
//

-- PROCEDIMIENTO PARA CREAR RESERVA DE ESTANCIA
DELIMITER //

CREATE PROCEDURE CrearReservaEstancia(
    IN ID_cliente INT,
    IN F_entrada DATETIME,
    IN F_salida DATETIME,
    IN ID_Empleado INT,
    IN TipoServicio VARCHAR(10),
    IN EstadoReserva VARCHAR(20),
    IN ID_Habitacion INT
)
BEGIN
    -- Crea una nueva reserva de estancia y su detalle de reserva
    INSERT INTO ReservacionEstancia(ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, EstadoReserva)
    VALUES (ID_cliente, F_entrada, F_salida, ID_Empleado, TipoServicio, EstadoReserva);

    INSERT INTO DetalleReservacion(ID_ReservaEstancia, ID_Habitacion)
    VALUES (LAST_INSERT_ID(), ID_Habitacion);
END;
//

-- PROCEDIMIENTO PARA MODIFICAR RESERVA DE ESTANCIA
DELIMITER //

CREATE PROCEDURE ModificarReservaEstancia(
    IN ID_ReservaEstancia INT,
    IN TipoServicio VARCHAR(10),
    IN F_entrada DATETIME,
    IN F_salida DATETIME
)
BEGIN
    -- Modifica los datos de una reserva de estancia y su detalle
    UPDATE ReservacionEstancia
    SET
        TipoServicio = TipoServicio,
        F_entrada = F_entrada,
        F_salida = F_salida
    WHERE ID_ReservaEstancia = ID_ReservaEstancia;
END;
//

-- PROCEDIMIENTO PARA CANCELAR RESERVA DE ESTANCIA
DELIMITER //

CREATE PROCEDURE CancelarReservaEstancia(IN ID_ReservaEstancia INT)
BEGIN
    -- Cambia el estado de una reserva de estancia a "Cancelada"
    UPDATE ReservacionEstancia
    SET EstadoReserva = 'Cancelada'
    WHERE ID_ReservaEstancia = ID_ReservaEstancia
    AND EstadoReserva = 'Activa';
END;
//

-- PROCEDIMIENTO PARA CALCULAR TOTAL DE INGRESOS POR FECHA
DELIMITER //

CREATE PROCEDURE CalcularTotalIngresos(
    IN fechaSeleccionada DATE,
    OUT totalIngresos FLOAT
)
BEGIN
    -- Calcula el total de ingresos en una fecha específica
    SELECT SUM(Habitacion.Precio * (DATEDIFF(ReservacionEstancia.F_salida, ReservacionEstancia.F_entrada) + 1))
    INTO totalIngresos
    FROM DetalleReservacion
    INNER JOIN ReservacionEstancia ON DetalleReservacion.ID_ReservaEstancia = ReservacionEstancia.ID_ReservaEstancia
    INNER JOIN Habitacion ON DetalleReservacion.ID_Habitacion = Habitacion.N_de_habitacion
    WHERE DATE(ReservacionEstancia.F_entrada) = fechaSeleccionada;
END;
//

DELIMITER ;



DELIMITER //


-- PROCEDIMIENTO PARA GUARDAR UN NUEVO SERVICIO
DELIMITER //

CREATE PROCEDURE VerServiciosEmpleados()
BEGIN
    SELECT S.ID_Servicios, CONCAT(P.Nombre1, ' ', P.Apellido1) AS NombreEmpleado, S.NombreServicio, S.DescripcionServicio
FROM SERVICIOS S
JOIN Empleado E ON S.ID_Empleado = E.ID_Empleado
JOIN Persona P ON E.ID_Persona = P.ID_Persona;


END //

DELIMITER ;





DELIMITER //

-- PROCEDIMIENTO PARA GUARDAR UN NUEVO SERVICIO
CREATE PROCEDURE GuardarServicio(
    IN empleado_id INT,
    IN nombre_servicio VARCHAR(20),
    IN descripcion_servicio VARCHAR(50)
)
BEGIN
    INSERT INTO SERVICIOS (ID_Empleado, NombreServicio, DescripcionServicio)
    VALUES (empleado_id, nombre_servicio, descripcion_servicio);
END;
//
DELIMITER //
-- PROCEDIMIENTO PARA EDITAR UN SERVICIO EXISTENTE
CREATE PROCEDURE EditarServicio(
    IN servicio_id INT,
    IN nombre_servicio VARCHAR(20),
    IN descripcion_servicio VARCHAR(50)
)
BEGIN
    UPDATE SERVICIOS
    SET
        
        NombreServicio = nombre_servicio,
        DescripcionServicio = descripcion_servicio
    WHERE ID_Servicios = servicio_id;
END;
//

-- PROCEDIMIENTO PARA ELIMINAR UN SERVICIO POR SU ID
DELIMITER //

CREATE PROCEDURE EliminarServicio(IN p_ID_Servicio INT)
BEGIN
    DELETE FROM SERVICIOS WHERE ID_Servicios = p_ID_Servicio;
END //

//




DELIMITER ;




