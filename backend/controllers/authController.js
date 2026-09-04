import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  try {
    const { name, email, password, phone, location, interests } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are all required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone: phone || "",
      location: location || "",
      interests: Array.isArray(interests) ? interests : [],
    });
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        interests: user.interests,
        role: user.role,
        isContributor: user.isContributor || false,
        contributions: user.contributions || [],
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        interests: user.interests,
        role: user.role,
        isContributor: user.isContributor || false,
        contributions: user.contributions || [],
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
};

export const updateInterests = async (req, res) => {
  try {
    const { interests } = req.body;

    if (!Array.isArray(interests) || interests.length === 0 || !interests.every((i) => typeof i === "string")) {
      return res.status(400).json({ message: "Interests must be a non-empty array of strings" });
    }

    const cleanInterests = interests.map((i) => i.trim().toLowerCase()).filter(Boolean);

    const user = await User.findByIdAndUpdate(
      req.userId,
      { interests: cleanInterests },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Preferences updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update interests", error: err.message });
  }
};