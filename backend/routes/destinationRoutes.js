import express from "express";
import {
  getAllDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
  generateDestinationContent,
} from "../controllers/destinationController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public — anyone can browse destinations
router.get("/", getAllDestinations);
router.get("/:slug", getDestinationBySlug);

// Admin-only — must be logged in AND have role "admin"
router.post("/", requireAuth, requireAdmin, createDestination);
router.post("/:slug/generate-content", requireAuth, requireAdmin, generateDestinationContent);
router.put("/:slug", requireAuth, requireAdmin, updateDestination);
router.delete("/:slug", requireAuth, requireAdmin, deleteDestination);

export default router;