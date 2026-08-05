import db from "../config/db.js";

export const getLocales = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM local ORDER BY id_local ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener locales:", error);
    res.status(500).json({ error: "Error al obtener locales" });
  }
};
