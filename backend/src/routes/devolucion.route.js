import { Router } from "express";
import { registrarDevolucion, obtenerDevoluciones } from "../controllers/devolucion.controller.js";
import verificarToken from "../middlewares/auth.middleware.js";

const router = Router();

// Registrar una devolución
router.post("/", verificarToken, registrarDevolucion);

// Obtener todas las devoluciones
router.get("/", verificarToken, obtenerDevoluciones);

export default router;
