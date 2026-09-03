import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import plannerRoutes from "./routes/plannerRoutes.js";
   // ...
   
   dotenv.config();
   
   connectDB();
   
   const app = express();
   


// Middleware — these must come first
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes — mounted after middleware
app.use("/api/planner", plannerRoutes);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);


app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// token for postman
// "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTdjYTAzM2YxOGZkMGExODgxZmFmNGQiLCJpYXQiOjE3ODgxODI3OTAsImV4cCI6MTc4ODc4NzU5MH0.UgpMW8SfWc48wAeuKG8NvgKfhWiqqzpid5KqzOQb6S0