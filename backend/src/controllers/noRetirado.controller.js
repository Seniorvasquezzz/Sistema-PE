import db from "../config/db.js";

export const crearNoRetirado = async (req, res) => {
  try {
    const { id_paquete, fecha_nr, motivo } = req.body;

    if (!id_paquete || !fecha_nr) {
      return res.status(400).json({ error: "id_paquete y fecha_nr son obligatorios" });
    }

    const result = await db.query(
      `
      INSERT INTO no_retirado (id_paquete, fecha_nr, motivo)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [id_paquete, fecha_nr, motivo]
    );

    res.status(201).json({
      mensaje: "No retirado registrado",
      no_retirado: result.rows[0]
    });

  } catch (error) {
    console.error("Error al registrar no retirado:", error);
    res.status(500).json({ error: "Error al registrar no retirado" });
  }
};
