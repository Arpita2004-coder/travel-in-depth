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

export const createDestination = async (req, res) => {
  try {
    const existing = await Destination.findOne({ slug: req.body.slug });
    if (existing) {
      return res.status(409).json({ message: `A destination with slug "${req.body.slug}" already exists` });
    }
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (err) {
    res.status(400).json({ message: "Failed to create destination", error: err.message });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!destination) {
      return res.status(404).json({ message: `No destination found for slug "${req.params.slug}"` });
    }
    res.status(200).json(destination);
  } catch (err) {
    res.status(400).json({ message: "Failed to update destination", error: err.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findOneAndDelete({ slug: req.params.slug });
    if (!destination) {
      return res.status(404).json({ message: `No destination found for slug "${req.params.slug}"` });
    }
    res.status(200).json({ message: `"${destination.name}" deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete destination", error: err.message });
  }
};