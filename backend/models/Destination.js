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
    // Coordinates for weather & geolocation
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    // Rich content fields (optional for gradual enrichment)
    about: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    badge: { type: String, default: "" },
    stats: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
    attractions: [
      {
        name: { type: String, required: true },
        desc: { type: String },
        description: { type: String },
        image: { type: String },
        tags: [
          {
            label: { type: String },
            color: { type: String },
          },
        ],
        rating: { type: String },
        reviews: { type: String },
        hours: { type: String },
      },
    ],
    foodRecommendations: [
      {
        name: { type: String, required: true },
        desc: { type: String },
        description: { type: String },
        type: { type: String },
        image: { type: String },
      },
    ],
    activities: [
      {
        name: { type: String, required: true },
        desc: { type: String },
        description: { type: String },
        icon: { type: String },
        time: { type: String },
        image: { type: String },
      },
    ],
    hiddenGems: [
      {
        name: { type: String },
        desc: { type: String },
        description: { type: String },
        icon: { type: String },
        location: { type: String },
        image: { type: String },
      },
    ],
    nearby: [
      {
        name: { type: String },
        emoji: { type: String },
        desc: { type: String },
        description: { type: String },
        distance: { type: String },
        image: { type: String },
      },
    ],
    months: [
      {
        m: { type: String },
        range: { type: String },
        label: { type: String },
        type: { type: String },
      },
    ],
    tips: [
      {
        icon: { type: String },
        title: { type: String },
        desc: { type: String },
      },
    ],
    checklist: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    gallery: {
      type: [String],
      default: [],
    },
    isEnriched: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);