import db from "../config/db.js";

// Obtener paquetes
export const getPaquetes = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM paquete ORDER BY id_paquete DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("ERROR GET:", error);
    res.status(500).json({ error: "Error al obtener paquetes" });
  }
};

// Crear paquete
export const createPaquete = async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", req.body);

    const {
      codigo,
      descripcion,
      vendedor,
      cliente,
      destino,
      procedencia,
      total,
      id_estado,
      id_local,
      fecha_ingreso
    } = req.body;

    const result = await db.query(
      `INSERT INTO paquete 
        (codigo, descripcion, vendedor, cliente, destino, procedencia, total, 
         id_estado, id_local, fecha_ingreso)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        codigo,
        descripcion,
        vendedor,
        cliente,
        destino,
        procedencia,
        total,
        id_estado,
        id_local,
        fecha_ingreso
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("ERROR CREATE:", error);
    res.status(500).json({ error: "Error al crear paquete" });
  }
};

// Editar paquete
export const updatePaquete = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      codigo,
      descripcion,
      vendedor,
      cliente,
      destino,
      procedencia,
      total,
      id_estado,
      id_local,
      fecha_ingreso
    } = req.body;

    const result = await db.query(
      `UPDATE paquete
       SET codigo=$1, descripcion=$2, vendedor=$3, cliente=$4, destino=$5,
           procedencia=$6, total=$7, id_estado=$8, id_local=$9, fecha_ingreso=$10
       WHERE id_paquete=$11
       RETURNING *`,
      [
        codigo,
        descripcion,
        vendedor,
        cliente,
        destino,
        procedencia,
        total,
        id_estado,
        id_local,
        fecha_ingreso,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("ERROR UPDATE:", error);
    res.status(500).json({ error: "Error al editar paquete" });
  }
};

// Cambiar estado
export const actualizarEstadoPaquete = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevo_estado } = req.body;

    const result = await db.query(
      `UPDATE paquete SET id_estado=$1 WHERE id_paquete=$2 RETURNING *`,
      [nuevo_estado, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("ERROR ESTADO:", error);
    res.status(500).json({ error: "Error al actualizar estado" });
  }
};

// Marcar como pagada
export const marcarComoPagada = async (req, res) => {
  try {
    const { id } = req.params;
    const { pagado_por, id_local_pago } = req.body;

    const result = await db.query(
      `UPDATE paquete
       SET fecha_pago=CURRENT_TIMESTAMP,
           pagado_por=$1,
           id_local_pago=$2
       WHERE id_paquete=$3
       RETURNING *`,
      [pagado_por, id_local_pago, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("ERROR PAGO:", error);
    res.status(500).json({ error: "Error al marcar como pagada" });
  }
};
