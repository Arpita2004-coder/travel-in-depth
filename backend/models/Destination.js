import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    region: { type: String, required: true },
    tagline: { type: String, required: true },
    bestSeason: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    budget: { type: String, required: true },
    image: { type: String, required: true },
    ecoOptions: { type: [String], default: [] },
    // Kept from the original hardcoded data — used for the SVG map positions on the homepage
    mapX: { type: Number },
    mapY: { type: Number },
    // Added for the weather feature (Month 3) — real coordinates, not SVG percentages
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);