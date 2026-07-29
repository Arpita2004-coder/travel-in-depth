import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Destination from "../models/Destination.js";
import { citiesData } from "./citiesData.js";
import mongoose from "mongoose";

dotenv.config();

const run = async () => {
  await connectDB();

  try {
    const deleted = await Destination.deleteMany({});
    console.log(`Cleared ${deleted.deletedCount} existing destination(s).`);

    const inserted = await Destination.insertMany(citiesData);
    console.log(`Seeded ${inserted.length} destinations successfully.`);
  } catch (err) {
    console.error("Seeding failed:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();