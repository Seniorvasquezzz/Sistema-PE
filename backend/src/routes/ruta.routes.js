import express from "express";
import { getRutas } from "../controllers/ruta.controller.js";

const router = express.Router();

router.get("/", getRutas);

export default router;
