import jwt from "jsonwebtoken";

/* ============================================================
   📌 Verificar token
   ============================================================ */

const SECRET = "CLAVE_SUPER_SECRETA";

export function verificarToken(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ ok: false, mensaje: "Falta token" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded.usuario;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, mensaje: "Token inválido" });
  }
}


/* ============================================================
   📌 Solo administradores
   ============================================================ */
export const soloAdmin = (req, res, next) => {
  if (req.user.rol !== "Administrador") {
    return res.status(403).json({ error: "Acceso denegado: solo administradores" });
  }
  next();
};
