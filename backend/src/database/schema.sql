-- ============================================
-- SISTEMA PE - BASE DE DATOS COMPLETA
-- ============================================

-- ===========================
-- ROLES
-- ===========================
CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO rol (nombre) VALUES ('admin'), ('local'), ('vendedor');

-- ===========================
-- USUARIOS
-- ===========================
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    id_rol INT REFERENCES rol(id_rol)
);

-- ===========================
-- LOCALES
-- ===========================
CREATE TABLE local (
    id_local SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

-- ===========================
-- USUARIO POR LOCAL
-- ===========================
CREATE TABLE usuario_local (
    id_usuario_local SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuario(id_usuario),
    id_local INT REFERENCES local(id_local)
);

-- ===========================
-- VENDEDORES
-- ===========================
CREATE TABLE vendedor (
    id_vendedor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_local INT REFERENCES local(id_local)
);

-- ===========================
-- ESTADOS DE PAQUETE
-- ===========================
CREATE TABLE estado_paquete (
    id_estado SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO estado_paquete (nombre) VALUES
('Ingresado'),
('En Ruta'),
('Entregado'),
('No Retirado'),
('Devuelto'),
('Pagada');

-- ===========================
-- RUTAS
-- ===========================
CREATE TABLE ruta (
    id_ruta SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ===========================
-- PAQUETES (TABLA PRINCIPAL)
-- ===========================
CREATE TABLE paquete (
    id_paquete SERIAL PRIMARY KEY,

    codigo VARCHAR(50) UNIQUE NOT NULL,
    descripcion VARCHAR(200),

    vendedor VARCHAR(100),
    cliente VARCHAR(100),
    destino VARCHAR(100),
    procedencia VARCHAR(100),
    total NUMERIC(10,2),

    id_estado INT REFERENCES estado_paquete(id_estado),
    id_local INT REFERENCES local(id_local),

    fecha_ingreso DATE DEFAULT CURRENT_DATE,

    id_ruta INT REFERENCES ruta(id_ruta),

    fecha_pago TIMESTAMP,
    pagado_por VARCHAR(100),
    id_local_pago INT REFERENCES local(id_local)
);

-- ===========================
-- RUTA PAQUETE (ASIGNACIÓN)
-- ===========================
CREATE TABLE ruta_paquete (
    id_ruta_paquete SERIAL PRIMARY KEY,
    id_ruta INT REFERENCES ruta(id_ruta),
    id_paquete INT REFERENCES paquete(id_paquete)
);

-- ===========================
-- PAGOS
-- ===========================
CREATE TABLE pago (
    id_pago SERIAL PRIMARY KEY,
    id_paquete INT REFERENCES paquete(id_paquete),
    monto NUMERIC(10,2) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ===========================
-- NO RETIRADOS
-- ===========================
CREATE TABLE no_retirado (
    id_nr SERIAL PRIMARY KEY,
    id_paquete INT REFERENCES paquete(id_paquete),
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo TEXT
);

-- ===========================
-- NR REVISION
-- ===========================
CREATE TABLE nr_revision (
    id_revision SERIAL PRIMARY KEY,
    id_paquete INT REFERENCES paquete(id_paquete),
    observaciones VARCHAR(200),
    fecha_revision DATE DEFAULT CURRENT_DATE
);

-- ===========================
-- DEVOLUCIONES
-- ===========================
CREATE TABLE devolucion (
    id_devolucion SERIAL PRIMARY KEY,
    id_paquete INT REFERENCES paquete(id_paquete),
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo TEXT
);

-- ===========================
-- CONCILIACIÓN
-- ===========================
CREATE TABLE conciliacion (
    id_conciliacion SERIAL PRIMARY KEY,
    id_paquete INT REFERENCES paquete(id_paquete),
    id_local INT REFERENCES local(id_local),
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50)
);
