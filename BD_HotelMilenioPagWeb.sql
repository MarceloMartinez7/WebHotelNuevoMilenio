-- Crear la base de datos
CREATE DATABASE DB_HotelMilenio;


USE DB_HotelMilenio;

-- Crear la tabla Persona
CREATE TABLE Persona (
  ID_Persona INT AUTO_INCREMENT PRIMARY KEY,
  Cedula VARCHAR(19),
  Nombre1 VARCHAR(15),
  Nombre2 VARCHAR(15),
  Apellido1 VARCHAR(15),
  Apellido2 VARCHAR(15),
  Telefono VARCHAR(9)
);

-- Crear la tabla Estado
CREATE TABLE Estado (
  ID_Estado INT AUTO_INCREMENT PRIMARY KEY,
  NombreEstado VARCHAR(30) NOT NULL
);

-- Crear la tabla Cliente
CREATE TABLE Cliente (
  ID_cliente INT AUTO_INCREMENT PRIMARY KEY,
  ID_Persona INT UNIQUE,
  Procedencia VARCHAR(40),
  FOREIGN KEY (ID_Persona) REFERENCES Persona (ID_Persona)
);

-- Crear la tabla Empleado
CREATE TABLE Empleado (
  ID_Empleado INT AUTO_INCREMENT PRIMARY KEY,
  ID_Persona INT UNIQUE,
  Usuario VARCHAR(15),
  Contraseña VARCHAR(30),
  FOREIGN KEY (ID_Persona) REFERENCES Persona (ID_Persona)
);

-- Crear la tabla Tipo_de_habitacion
CREATE TABLE Tipo_de_habitacion (
  ID_tipoHabitacion INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(30) NOT NULL,
  Descripcion VARCHAR(60)
);

-- Crear la tabla Habitacion
CREATE TABLE Habitacion (
  ID_Habitacion INT PRIMARY KEY,
  N_de_habitacion INT,
  ID_tipoHabitacion INT,
  Num_Cama INT,
  ID_Estado INT,
  Precio INT,
  Imagenes LONGTEXT,
  FOREIGN KEY (ID_tipoHabitacion) REFERENCES Tipo_de_habitacion (ID_tipoHabitacion),
  FOREIGN KEY (ID_Estado) REFERENCES Estado (ID_Estado)
);

-- Crear la tabla ReservacionEstancia
CREATE TABLE ReservacionEstancia (
  ID_ReservaEstancia INT AUTO_INCREMENT PRIMARY KEY,
  ID_cliente INT,
  F_entrada DATETIME,
  F_salida DATETIME,
  ID_Empleado INT,
  TipoServicio VARCHAR(10),
  EstadoReserva VARCHAR(20),
  FOREIGN KEY (ID_cliente) REFERENCES Cliente (ID_cliente),
  FOREIGN KEY (ID_Empleado) REFERENCES Empleado (ID_Empleado)
);

-- Crear la tabla DetalleReservacion
CREATE TABLE DetalleReservacion (
  ID_DetalleReservacion INT AUTO_INCREMENT PRIMARY KEY,
  ID_ReservaEstancia INT,
  ID_Habitacion INT,
  FOREIGN KEY (ID_ReservaEstancia) REFERENCES ReservacionEstancia (ID_ReservaEstancia),
  FOREIGN KEY (ID_Habitacion) REFERENCES Habitacion (ID_Habitacion)
);


-- Crear la tabla SERVICIOS
CREATE TABLE SERVICIOS (
  ID_Servicios INT AUTO_INCREMENT PRIMARY KEY,
  ID_Empleado INT,
  NombreServicio VARCHAR(20),
  DescripcionServicio VARCHAR(50),
  FOREIGN KEY (ID_Empleado) REFERENCES Empleado (ID_Empleado)
);

