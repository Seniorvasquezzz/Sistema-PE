import express from "express";
import { getLocales } from "../controllers/local.controller.js";

const router = express.Router();

router.get("/", getLocales);

export default router;
