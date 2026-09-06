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

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

const buildContentDraftPrompt = ({ name, state, region, tagline }) => `
You are an expert Indian travel writer and researcher. Generate realistic, factual, rich travel guide content for the destination "${name}" located in state "${state || "India"}", region "${region || "India"}"${tagline ? `, with tagline "${tagline}"` : ""}.

Respond with ONLY a valid JSON object without markdown fences, formatted strictly in this exact shape:
{
  "about": "2-3 paragraph rich, descriptive overview covering history, culture, geography, and distinct travel vibe of ${name}.",
  "attractions": [
    {
      "name": "Exact iconic landmark / attraction name",
      "description": "Factual description with historical or experiential significance"
    }
  ],
  "foodRecommendations": [
    {
      "name": "Famous local dish or cuisine specialty",
      "description": "Authentic description of the dish, ingredients, flavor profile, or where to find it"
    }
  ],
  "activities": [
    {
      "name": "Distinctive activity / experience name",
      "description": "Engaging description of what visitors do and why it is memorable"
    }
  ]
}
Requirements:
- "attractions": provide 4 to 6 entries.
- "foodRecommendations": provide 3 to 5 entries.
- "activities": provide 3 to 5 entries.
- Maintain factual accuracy for ${name}. Do not output markdown code blocks.
`;

const generateCuratedDraftFallback = ({ name, state, region, tagline }) => ({
  about: `${name} is one of the most captivating travel destinations in ${state || "India"}, celebrated throughout the ${region || "region"} for its vibrant cultural heritage, timeless traditions, and picturesque landscapes.\n\nVisitors are immersed in an evocative atmosphere where ancient monuments and serene natural retreats blend seamlessly with authentic local living. From historic pathways to colorful markets, ${name} provides travellers with a deeply enriching insight into the region's storied past and welcoming community life.\n\nWhether exploring heritage quarters, enjoying traditional culinary delights, or soaking in panoramic vistas at twilight, ${name} leaves an indelible impression on every visitor.`,
  attractions: [
    {
      name: `${name} Heritage Landmark`,
      description: `The central historic architectural marvel of ${name}, exhibiting centuries-old craftsmanship, royal courtyards, and panoramic vantage points.`
    },
    {
      name: `Old Town & Historic Bazaars of ${name}`,
      description: `Winding lanes filled with traditional craft workshops, handloom textiles, regional spices, and heritage architecture.`
    },
    {
      name: `${name} Scenic Viewpoint & Promenade`,
      description: `A celebrated vantage point offering breathtaking panoramic sunrise and sunset vistas across the surrounding landscape.`
    },
    {
      name: `Sacred Temples & Cultural Enclave`,
      description: `An ancient spiritual and cultural complex featuring intricate stone carvings, peaceful courtyards, and active devotional traditions.`
    }
  ],
  foodRecommendations: [
    {
      name: `Authentic ${state || "Regional"} Heritage Thali`,
      description: `A wholesome, multi-dish culinary experience featuring traditional gravies, slow-cooked lentils, freshly baked regional breads, and seasonal chutneys.`
    },
    {
      name: `Celebrated ${name} Street Delicacies`,
      description: `Crispy spiced savory snacks and morning fritters prepared with fragrant spices and served alongside tangy tamarind and mint dips.`
    },
    {
      name: `Traditional Artisanal Sweets & Desserts`,
      description: `Rich milk and jaggery-based confections infused with cardamom, saffron, and roasted nuts, perfected over generations of confectioners.`
    }
  ],
  activities: [
    {
      name: `Guided Heritage & Architecture Walking Tour`,
      description: `Explore hidden courtyard residences, ancient doorways, and untold folklore with a knowledgeable local heritage historian.`
    },
    {
      name: `Artisan Craft & Handloom Workshop Experience`,
      description: `Observe master artisans at work creating pottery, hand-block printing, or stone carving, with opportunities for hands-on learning.`
    },
    {
      name: `Golden Hour Sunset Walk & Cultural Evening`,
      description: `Relaxing twilight walk along scenic promenades followed by live acoustic folk melodies and open-air regional dining.`
    }
  ]
});

export const generateDestinationContent = async (req, res) => {
  try {
    const { slug } = req.params;
    let destination = await Destination.findOne({ slug });

    // If destination not yet created, allow fallback to request body if available
    const name = destination?.name || req.body?.name || slug;
    const state = destination?.state || req.body?.state || "";
    const region = destination?.region || req.body?.region || "";
    const tagline = destination?.tagline || req.body?.tagline || "";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("No GEMINI_API_KEY found, serving curated draft content.");
      return res.status(200).json(generateCuratedDraftFallback({ name, state, region, tagline }));
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: buildContentDraftPrompt({ name, state, region, tagline }) }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      });

      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const cleaned = rawText.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);

        if (parsed && typeof parsed.about === "string" && Array.isArray(parsed.attractions)) {
          return res.status(200).json(parsed);
        }
      } else {
        const errText = await response.text();
        console.warn("Gemini API error during content generation:", response.status, errText);
      }
    } catch (aiErr) {
      clearTimeout(timeout);
      console.warn("Gemini draft generation timed out or failed:", aiErr.message);
    }

    // Fallback: return curated rich draft so admin can edit
    const fallbackDraft = generateCuratedDraftFallback({ name, state, region, tagline });
    return res.status(200).json(fallbackDraft);
  } catch (err) {
    console.error("Generate destination content error:", err.message);
    res.status(500).json({ message: "Failed to generate draft content", error: err.message });
  }
};