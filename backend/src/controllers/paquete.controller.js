import db from "../config/db.js";

/* ============================================================
   📌 GET: Listar paquetes con filtros por estado y ruta
   ============================================================ */
export const getPaquetes = async (req, res) => {
  try {
    const { estado, ruta } = req.query;

    let filtros = [];
    let valores = [];

    // Filtro por estado
    if (estado) {
      const estadoResult = await db.query(
        "SELECT id_estado FROM estado_paquete WHERE nombre_estado = $1",
        [estado]
      );

      if (estadoResult.rows.length === 0) {
        return res.status(404).json({ error: "El estado indicado no existe" });
      }

      filtros.push(`p.id_estado = $${filtros.length + 1}`);
      valores.push(estadoResult.rows[0].id_estado);
    }

    // Filtro por ruta
    if (ruta) {
      const rutaResult = await db.query(
        "SELECT id_ruta FROM ruta WHERE nombre_ruta = $1",
        [ruta]
      );

      if (rutaResult.rows.length === 0) {
        return res.status(404).json({ error: "La ruta indicada no existe" });
      }

      filtros.push(`p.id_ruta = $${filtros.length + 1}`);
      valores.push(rutaResult.rows[0].id_ruta);
    }

    let query = `
      SELECT p.*, e.nombre_estado, l.nombre_local, r.nombre_ruta
      FROM paquete p
      INNER JOIN estado_paquete e ON p.id_estado = e.id_estado
      INNER JOIN local l ON p.id_local = l.id_local
      INNER JOIN ruta r ON p.id_ruta = r.id_ruta
    `;

    if (filtros.length > 0) {
      query += ` WHERE ${filtros.join(" AND ")}`;
    }

    query += " ORDER BY p.id_paquete ASC";

    const result = await db.query(query, valores);

    res.json(result.rows);

  } catch (error) {
    console.error("Error al obtener paquetes:", error);
    res.status(500).json({ error: "Error al obtener paquetes" });
  }
};

/* ============================================================
   📌 POST: Crear paquete con estado inicial "Pendiente"
   ============================================================ */
export const createPaquete = async (req, res) => {
  try {
    const { codigo, descripcion, id_local, id_ruta } = req.body;

    if (!codigo || !descripcion || !id_local || !id_ruta) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Obtener id del estado Pendiente
    const estadoResult = await db.query(
      "SELECT id_estado FROM estado_paquete WHERE nombre_estado = 'Pendiente'"
    );

    if (estadoResult.rows.length === 0) {
      return res.status(500).json({ error: "Estado 'Pendiente' no existe en la base" });
    }

    const id_estado = estadoResult.rows[0].id_estado;

    const query = `
      INSERT INTO paquete (codigo, descripcion, id_local, id_estado, id_ruta)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [codigo, descripcion, id_local, id_estado, id_ruta];

    const result = await db.query(query, values);

    res.status(201).json({
      mensaje: "Paquete registrado exitosamente",
      paquete: result.rows[0]
    });

  } catch (error) {
    console.error("Error al crear paquete:", error);
    res.status(500).json({ error: "Error al crear paquete" });
  }
};

/* ============================================================
   📌 PUT: Actualizar estado del paquete
   ============================================================ */
export const actualizarEstadoPaquete = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevo_estado } = req.body;

    if (!nuevo_estado) {
      return res.status(400).json({ error: "El campo nuevo_estado es obligatorio" });
    }

    const estadoResult = await db.query(
      "SELECT id_estado FROM estado_paquete WHERE nombre_estado = $1",
      [nuevo_estado]
    );

    if (estadoResult.rows.length === 0) {
      return res.status(404).json({ error: "El estado indicado no existe" });
    }

    const id_estado = estadoResult.rows[0].id_estado;

    const updateResult = await db.query(
      "UPDATE paquete SET id_estado = $1 WHERE id_paquete = $2 RETURNING *",
      [id_estado, id]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: "Paquete no encontrado" });
    }

    res.json({
      mensaje: "Estado actualizado correctamente",
      paquete: updateResult.rows[0]
    });

  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ error: "Error al actualizar estado del paquete" });
  }
};

/* ============================================================
   📌 PUT: Marcar remus como pagadas (usuarios locales)
   ============================================================ */
export const marcarComoPagada = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = req.user; // viene del login
    const id_local_usuario = usuario.id_local;

    // 1️⃣ Verificar si ya está pagada
    const paquete = await db.query(
      "SELECT id_estado FROM paquete WHERE id_paquete = $1",
      [id]
    );

    if (paquete.rows.length === 0) {
      return res.status(404).json({ error: "Paquete no encontrado" });
    }

    const estadoActual = paquete.rows[0].id_estado;

    // Si ya está pagada → solo admin puede modificar
    if (estadoActual === 2 && usuario.rol !== "Administrador") {
      return res.status(403).json({
        error: "Este remus ya está pagada. Solo administradores pueden modificarla."
      });
    }

    // 2️⃣ Obtener id del estado "Entregado" o "Pagada"
    const estadoResult = await db.query(
      "SELECT id_estado FROM estado_paquete WHERE nombre_estado = 'Entregado'"
    );

    const id_estado_pagada = estadoResult.rows[0].id_estado;

    // 3️⃣ Actualizar como pagada
    const result = await db.query(
      `
      UPDATE paquete
      SET id_estado = $1,
          fecha_pago = CURRENT_TIMESTAMP,
          pagado_por = $2,
          id_local_pago = $3
      WHERE id_paquete = $4
      RETURNING *;
      `,
      [id_estado_pagada, usuario.nombre, id_local_usuario, id]
    );

    res.json({
      mensaje: "Remu marcada como pagada",
      paquete: result.rows[0]
    });

  } catch (error) {
    console.error("Error al marcar como pagada:", error);
    res.status(500).json({ error: "Error al marcar remu como pagada" });
  }
};
