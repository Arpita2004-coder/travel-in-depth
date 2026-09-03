import express from "express";
import { generateItinerary } from "../controllers/plannerController.js";
import {
  regenerateDay,
  saveItinerary,
  getMyItineraries,
  deleteItinerary,
} from "../controllers/plannerExtraController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { plannerRateLimit } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/generate", requireAuth, plannerRateLimit, generateItinerary);
router.post("/generate/day", requireAuth, plannerRateLimit, regenerateDay);
router.post("/save", requireAuth, saveItinerary);
router.get("/my", requireAuth, getMyItineraries);
router.delete("/my/:id", requireAuth, deleteItinerary);

export default router;