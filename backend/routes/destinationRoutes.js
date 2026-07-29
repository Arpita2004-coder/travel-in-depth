import express from "express";
import { getAllDestinations, getDestinationBySlug } from "../controllers/destinationController.js";

const router = express.Router();

router.get("/", getAllDestinations);
router.get("/:slug", getDestinationBySlug);

export default router;