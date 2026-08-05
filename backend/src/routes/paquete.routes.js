import express from "express";
import {
  getPaquetes,
  createPaquete,
  actualizarEstadoPaquete
} from "../controllers/paquete.controller.js";

const router = express.Router();

router.get("/", getPaquetes);
router.post("/", createPaquete);
router.put("/:id/estado", actualizarEstadoPaquete);
router.put("/:id/pagar", marcarComoPagada);


export default router;
