import express from "express";
import { crearDevolucion } from "../controllers/devolucion.controller.js";

const router = express.Router();

router.post("/", crearDevolucion);

export default router;
