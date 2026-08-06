import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import app from "./app.js";

// Rutas
import authRoutes from "./routes/auth.routes.js";
import paqueteRoutes from "./routes/paquete.routes.js";
import rutaRoutes from "./routes/ruta.routes.js";
import localRoutes from "./routes/local.routes.js";
import noRetiradoRoutes from "./routes/noRetirado.routes.js";
import devolucionRoutes from "./routes/devolucion.routes.js";

// Middleware de autenticación
import { verificarToken } from "./middleware/auth.js";

dotenv.config();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use("/auth", authRoutes);

// Rutas protegidas
app.use("/paquetes", verificarToken, paqueteRoutes);
app.use("/rutas", verificarToken, rutaRoutes);
app.use("/locales", verificarToken, localRoutes);
app.use("/no-retirados", verificarToken, noRetiradoRoutes);
app.use("/devoluciones", verificarToken, devolucionRoutes);

// Inicio del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
