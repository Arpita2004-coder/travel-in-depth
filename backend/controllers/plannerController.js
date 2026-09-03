const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

const buildPrompt = ({ destination, days, budget, interests, travelStyle }) => `
You are a travel planning assistant. Create a ${days}-day itinerary for ${destination}, India.
Budget: ${budget || "not specified"}.
Traveler interests: ${interests || "general sightseeing"}.
Travel style: ${travelStyle || "balanced pace"}.

Respond with ONLY valid JSON, no markdown code fences, no commentary before or after. Use exactly this shape:

{
  "destination": "${destination}",
  "days": [
    {
      "day": 1,
      "title": "short theme for the day",
      "morning": "activity description",
      "afternoon": "activity description",
      "evening": "activity description",
      "meals": "meal suggestions for the day",
      "estimatedBudgetINR": "e.g. ₹2,000 - ₹3,500",
      "tips": "one practical tip for this day"
    }
  ]
}

Include exactly ${days} entries in the "days" array, numbered 1 through ${days}.
`;

export const generateItinerary = async (req, res) => {
  try {
    const body = req.body || {};
    const { destination, days, budget, interests, travelStyle } = body;

    if (!destination || !days) {
      return res.status(400).json({ message: "destination and days are required" });
    }
    if (days < 1 || days > 14) {
      return res.status(400).json({ message: "days must be between 1 and 14" });
    }

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: buildPrompt({ destination, days, budget, interests, travelStyle }) }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json", // asks Gemini to return raw JSON, no fences
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return res.status(502).json({ message: "AI planner is temporarily unavailable. Please try again shortly." });
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    let itinerary;
    try {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      itinerary = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse itinerary JSON:", rawText);
      return res.status(502).json({ message: "AI returned an unexpected format. Please try again." });
    }

    res.status(200).json(itinerary);
  } catch (err) {
    console.error("Planner generation failed:", err.message);
    res.status(500).json({ message: "Failed to generate itinerary", error: err.message });
  }
};