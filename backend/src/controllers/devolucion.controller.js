import db from "../config/db.js";

export const crearDevolucion = async (req, res) => {
  try {
    const { id_paquete, fecha_devolucion, motivo } = req.body;

    if (!id_paquete || !fecha_devolucion) {
      return res.status(400).json({ error: "id_paquete y fecha_devolucion son obligatorios" });
    }

    const result = await db.query(
      `
      INSERT INTO devolucion (id_paquete, fecha_devolucion, motivo)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [id_paquete, fecha_devolucion, motivo]
    );

    res.status(201).json({
      mensaje: "Devolución registrada",
      devolucion: result.rows[0]
    });

  } catch (error) {
    console.error("Error al registrar devolución:", error);
    res.status(500).json({ error: "Error al registrar devolución" });
  }
};
