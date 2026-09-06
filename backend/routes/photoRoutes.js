import express from "express";
import { searchPhotos, bulkSearchPhotos } from "../controllers/photoController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin protected photo search
router.get("/search", requireAuth, requireAdmin, searchPhotos);
router.post("/bulk-search", requireAuth, requireAdmin, bulkSearchPhotos);

export default router;

