import express from "express";
import {
  getPaquetes,
  createPaquete,
  updatePaquete,
  actualizarEstadoPaquete,
  marcarComoPagada
} from "../controllers/paquete.controller.js";

const router = express.Router();

router.get("/", getPaquetes);
router.post("/", createPaquete);
router.put("/:id", updatePaquete);
router.put("/estado/:id", actualizarEstadoPaquete);
router.put("/pagar/:id", marcarComoPagada);

export default router;
