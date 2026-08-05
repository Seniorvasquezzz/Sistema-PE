import db from "../config/db.js";

export const getRutas = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM ruta ORDER BY id_ruta ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener rutas:", error);
    res.status(500).json({ error: "Error al obtener rutas" });
  }
};
