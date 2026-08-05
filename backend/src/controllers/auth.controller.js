import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ============================================================
   📌 LOGIN
   ============================================================ */

export const login = async (req, res) => {
  try {
    const { usuario, clave } = req.body;

    if (!usuario || !clave) {
      return res.status(400).json({ error: "Usuario y clave son obligatorios" });
    }

  // 🔹 Validación temporal (solo para pruebas)
  console.log("Datos recibidos:", req.body);

  if (usuario === "admin" && clave === "1234") {
  return res.json({ 
    usuario,
    rol: "administrador",
    local: "Sucursal Central",
    token: "jwt-token-de-ejemplo"
  });
}


    // Buscar usuario 
    const result = await db.query(
      `
      SELECT u.*, r.nombre_rol, l.nombre_local
      FROM usuario u
      INNER JOIN rol r ON u.id_rol = r.id_rol
      LEFT JOIN local l ON u.id_local = l.id_local
      WHERE u.usuario = $1
      `,
      [usuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    // Validar contraseña
    const match = await bcrypt.compare(clave, user.clave);

    if (!match) {
      return res.status(401).json({ error: "Clave incorrecta" });
    }

    // Crear token
    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        usuario: user.usuario,
        rol: user.nombre_rol,
        id_local: user.id_local
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        rol: user.nombre_rol,
        local: user.nombre_local
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en login" });
  }
};
