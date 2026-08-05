import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// 📌 Rutas del sistema (todas desde /routes porque index.js está dentro de /src)
import authRoutes from "./routes/auth.routes.js";
import paqueteRoutes from "./routes/paquete.routes.js";
import rutaRoutes from "./routes/ruta.routes.js";
import localRoutes from "./routes/local.routes.js";
import noRetiradoRoutes from "./routes/noRetirado.routes.js";
import devolucionRoutes from "./routes/devolucion.routes.js";

// 🔐 Middlewares de autenticación
import { verificarToken } from "./middleware/auth.js";

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// ===============================
// 🔐 RUTA DE LOGIN (PÚBLICA)
// ===============================
app.use("/auth", authRoutes);

// ===============================
// 🔒 RUTAS PROTEGIDAS (TOKEN REQUERIDO)
// ===============================
app.use("/paquetes", verificarToken, paqueteRoutes);
app.use("/rutas", verificarToken, rutaRoutes);
app.use("/locales", verificarToken, localRoutes);
app.use("/no-retirados", verificarToken, noRetiradoRoutes);
app.use("/devoluciones", verificarToken, devolucionRoutes);

// ===============================
// 🚀 INICIO DEL SERVIDOR
// ===============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

