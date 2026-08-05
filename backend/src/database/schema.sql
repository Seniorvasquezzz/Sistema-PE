-- Creación de tablas principales del sistema logístico

CREATE TABLE local (
    id_local SERIAL PRIMARY KEY,
    nombre_local VARCHAR(100) NOT NULL,
    direccion VARCHAR(200),
    telefono VARCHAR(20)
);

CREATE TABLE usuario_local (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    rol VARCHAR(50),
    id_local INT REFERENCES local(id_local)
);

CREATE TABLE estado_paquete (
    id_estado SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE paquete (
    id_paquete SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    descripcion VARCHAR(200),
    id_estado INT REFERENCES estado_paquete(id_estado),
    id_local INT REFERENCES local(id_local),
    fecha_ingreso DATE DEFAULT CURRENT_DATE
);

CREATE TABLE devolucion (
    id_devolucion SERIAL PRIMARY KEY,
    id_paquete INT REFERENCES paquete(id_paquete),
    motivo VARCHAR(200),
    fecha_devolucion DATE DEFAULT CURRENT_DATE
);

CREATE TABLE nr_revision (
    id_revision SERIAL PRIMARY KEY,
    id_paquete INT REFERENCES paquete(id_paquete),
    observaciones VARCHAR(200),
    fecha_revision DATE DEFAULT CURRENT_DATE
);
