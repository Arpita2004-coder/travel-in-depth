import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/recommendations - Works for both guest and authenticated users
router.get("/", optionalAuth, getRecommendations);

export default router;
