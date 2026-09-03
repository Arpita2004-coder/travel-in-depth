import express from "express";
import { getWeather } from "../controllers/weatherController.js";

const router = express.Router();

// GET /api/weather?slug=jaipur OR ?lat=...&lng=...
router.get("/", getWeather);

export default router;
