import mongoose from "mongoose";

const dayPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    morning: { type: String, required: true },
    afternoon: { type: String, required: true },
    evening: { type: String, required: true },
    meals: { type: String, required: true },
    estimatedBudgetINR: { type: String, required: true },
    tips: { type: String },
  },
  { _id: false }
);

const itinerarySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    destination: { type: String, required: true },
    days: { type: [dayPlanSchema], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Itinerary", itinerarySchema);
