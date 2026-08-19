// Usage: node seed/makeAdmin.js youremail@example.com
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const email = process.argv[2];

if (!email) {
  console.error("Usage: node seed/makeAdmin.js youremail@example.com");
  process.exit(1);
}

const run = async () => {
  await connectDB();

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.error(`No user found with email "${email}". Sign up with that email first.`);
    } else {
      console.log(`${user.name} (${user.email}) is now an admin.`);
    }
  } catch (err) {
    console.error("Failed:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();