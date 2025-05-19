
/* ─────────────────────────────────────────────
   0. Eliminar tablas en orden correcto
───────────────────────────────────────────── */
DROP TABLE IF EXISTS historico;
DROP TABLE IF EXISTS venta;
DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS rol;

/* ─────────────────────────────────────────────
   1. Crear tabla rol
───────────────────────────────────────────── */
CREATE TABLE rol (
  id_rol   SERIAL PRIMARY KEY,
  tipo_rol VARCHAR(30) NOT NULL UNIQUE         -- ADMIN | ALMACENISTA
);

/* ─────────────────────────────────────────────
   2. Crear tabla usuario
───────────────────────────────────────────── */
CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  nombre     VARCHAR(100) NOT NULL,
  correo     VARCHAR(50)  NOT NULL UNIQUE,
  contrasena VARCHAR(60)  NOT NULL,            -- se almacenará encriptada (BCrypt)
  estatus    BOOLEAN      NOT NULL DEFAULT true,
  id_rol     INT NOT NULL
             REFERENCES rol(id_rol)
);

/* ─────────────────────────────────────────────
   3. Crear tabla producto
───────────────────────────────────────────── */
CREATE TABLE producto (
  id_producto SERIAL PRIMARY KEY,
  nombre      VARCHAR(120) NOT NULL,
  precio      NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
  estatus     BOOLEAN       NOT NULL DEFAULT true
);

/* ─────────────────────────────────────────────
   4. Crear tabla venta
───────────────────────────────────────────── */
CREATE TABLE venta (
  id_venta    SERIAL PRIMARY KEY,
  id_producto INT NOT NULL
             REFERENCES producto(id_producto),
  cantidad    INT NOT NULL CHECK (cantidad > 0),
  fecha_hora  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estatus     BOOLEAN NOT NULL DEFAULT true,
  id_usuario  INT NOT NULL
             REFERENCES usuario(id_usuario)
);

/* ─────────────────────────────────────────────
   5. Crear tabla historico
───────────────────────────────────────────── */
CREATE TABLE historico (
  id_mov      SERIAL PRIMARY KEY,
  tipo        VARCHAR(20) NOT NULL,
  id_producto INT NOT NULL
             REFERENCES producto(id_producto),
  cantidad    INT NOT NULL CHECK (cantidad >= 0),
  fecha_hora  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario  INT NOT NULL
             REFERENCES usuario(id_usuario),
  detalle     TEXT
);

/* ─────────────────────────────────────────────
   6. Insertar roles
───────────────────────────────────────────── */
INSERT INTO rol (tipo_rol) VALUES
('ADMIN'),
('ALMACENISTA');

/* ─────────────────────────────────────────────
   7. Insertar usuarios
───────────────────────────────────────────── */
INSERT INTO usuario (nombre, correo, contrasena, estatus, id_rol) VALUES
('ADMIN', 'ADMIN@empresa.com', 'hashed_password_admin', true, 1),   -- ADMIN
('ALMACENISTA', 'ALMACENISTA@empresa.com', 'hashed_password_storekeeper', true, 2); -- ALMACENISTA

/* ─────────────────────────────────────────────
   8. Insertar productos tecnológicos
───────────────────────────────────────────── */
INSERT INTO producto (nombre, precio, estatus) VALUES
('Laptop Dell XPS 13', 1200.00, true),
('Smartphone Samsung Galaxy S21', 800.00, true),
('Monitor LG 27" 4K', 350.00, true),
('Teclado Mecánico Logitech', 120.00, true),
('Mouse Inalámbrico Apple', 99.99, true),
('Disco Duro Externo Seagate 2TB', 150.00, true);

/* ─────────────────────────────────────────────
   9. Insertar ventas realizadas por el almacenista (usuario id 2)
───────────────────────────────────────────── */
INSERT INTO venta (id_producto, cantidad, estatus, id_usuario) VALUES
(1, 2, true, 2),
(2, 1, true, 2),
(3, 5, true, 2),
(4, 1, true, 2),
(5, 3, true, 2),
(6, 2, true, 2);


/*---------------
Creacion de procedimientos y cursores almacenados
-------------------*/
Create SCHEMA Pkginventario

CREATE OR REPLACE FUNCTION Pkginventario.obtenerProductos()
RETURNS TABLE(
    idproducto     	 INT,
    nombreproducto 	 VARCHAR(120),
    precio           NUMERIC,
    idventa          INT,
    fechaventa       TIMESTAMP,
    cantidad         INT,
	estatus			 BOOLEAN,
    total            NUMERIC
)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
       SELECT 
        p.id_producto,
        p.nombre,
        p.precio,
        v.id_venta,
        v.fecha_hora,
        v.cantidad,
		v.estatus,
        p.precio * v.cantidad as TOTAL
    FROM producto p
    JOIN venta v ON p.id_producto = v.id_producto
	;
END;
$$;

INSERT INTO dmlsInventario (
    nombre_paquete,
    nombre_procedimiento,
    descripcion,
    parametros,
    tipo_retorno,
    script_ejecucion
) VALUES (
    'Pkginventario',
    'obtenerProductos',
    'Obtiene productos con sus ventas relacionadas',
    '[]'::jsonb,
    'TABLE(id_producto INT, nombre_producto VARCHAR, ...)',
    'SELECT * FROM Pkginventario.obtenerProductos()'
);