import express from "express";
import { crearNoRetirado } from "../controllers/noRetirado.controller.js";

const router = express.Router();

router.post("/", crearNoRetirado);

export default router;
