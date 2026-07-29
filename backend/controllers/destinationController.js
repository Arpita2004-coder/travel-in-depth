import Destination from "../models/Destination.js";

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({});
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch destinations", error: err.message });
  }
};

export const getDestinationBySlug = async (req, res) => {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug });
    if (!destination) {
      return res.status(404).json({ message: `No destination found for slug "${req.params.slug}"` });
    }
    res.status(200).json(destination);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch destination", error: err.message });
  }
};