const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

const buildPrompt = ({ destination, days, budget, interests, travelStyle }) => `
You are an expert Indian travel planner. Create a realistic, high-quality ${days}-day itinerary for ${destination}, India.
Budget Tier: ${budget || "mid-range"}.
Traveler Interests: ${interests || "sightseeing, food, culture"}.
Style: ${travelStyle || "balanced"}.

Respond with ONLY valid JSON without markdown fences. Follow this structure:
{
  "destination": "${destination}",
  "days": [
    {
      "day": 1,
      "title": "short day theme (do not repeat 'Day 1:' in title, just theme like 'Iconic Landmarks & Heritage')",
      "morning": "specific activity at landmark with timing",
      "afternoon": "specific activity or market with lunch",
      "evening": "sunset/cultural experience and dinner",
      "meals": "authentic local delicacies recommendation",
      "estimatedBudgetINR": "e.g. ₹2,500",
      "tips": "practical local advice"
    }
  ]
}
Include exactly ${days} entries in "days" array numbered 1 to ${days}. Keep descriptions crisp.`;

// Curated high-speed offline itinerary generator for instant fallback
const generateCuratedFallback = ({ destination, days, budget, travelStyle }) => {
  const destLower = destination.toLowerCase();
  const dayTemplates = [
    {
      title: "Iconic Landmarks & Heritage Exploration",
      morning: `Begin early at ${destination}'s most renowned heritage landmark and historic core to beat the afternoon crowds.`,
      afternoon: `Enjoy authentic regional thali lunch at a heritage cafe followed by a visit to central artisan bazaars and craft centers.`,
      evening: `Capture the panoramic golden hour sunset from a hilltop fort or scenic promenade, followed by local live musical performance.`,
      meals: "Local special breakfast (Poha/Kachori/Chai) & traditional regional dinner",
      estimatedBudgetINR: budget === "budget" ? "₹1,200 - ₹2,000" : budget === "luxury" ? "₹8,000 - ₹15,000" : "₹3,000 - ₹5,000",
      tips: "Wear comfortable walking shoes and carry cash for local craft shopping.",
    },
    {
      title: "Cultural Immersion & Food Trail",
      morning: `Explore sacred temples, historic ghats, and royal palaces with an expert local heritage storyteller.`,
      afternoon: `Guided street food and spice trail sampling century-old family recipes and artisanal delicacies.`,
      evening: `Evening boat ride or rooftop dinner overlooking the illuminated city skyline under the stars.`,
      meals: "Culinary tasting tour with authentic street delicacies and slow-cooked dinner",
      estimatedBudgetINR: budget === "budget" ? "₹1,500 - ₹2,200" : budget === "luxury" ? "₹9,000 - ₹18,000" : "₹3,500 - ₹5,500",
      tips: "Book cultural shows or entry passes in advance to skip ticket queues.",
    },
    {
      title: "Nature, Eco-Trails & Scenic Serenity",
      morning: `Peaceful sunrise walk through lush botanical gardens, lake reserves, or ancient stepwells.`,
      afternoon: `Visit local artisan village workshops to observe traditional textile weaving and pottery making.`,
      evening: `Farewell dinner at a celebrated open-air rooftop restaurant with folk dance and cultural storytelling.`,
      meals: "Organic farm-to-table lunch & celebrated dessert specialities",
      estimatedBudgetINR: budget === "budget" ? "₹1,200 - ₹1,800" : budget === "luxury" ? "₹7,500 - ₹14,000" : "₹2,800 - ₹4,800",
      tips: "Carry sunscreen, a reusable bottle, and keep a camera ready for wildlife and birds.",
    },
    {
      title: "Offbeat Secrets & Hidden Neighborhoods",
      morning: `Discover hidden courtyard havelis and quieter historic quarters before standard tour buses arrive.`,
      afternoon: `Browse contemporary art galleries, boutique souvenir shops, and quiet garden cafes.`,
      evening: `Stargazing or relaxing twilight stroll through vibrant night markets and illuminated fountains.`,
      meals: "Regional heritage dishes and specialty desserts",
      estimatedBudgetINR: budget === "budget" ? "₹1,400 - ₹2,200" : budget === "luxury" ? "₹8,500 - ₹16,000" : "₹3,200 - ₹5,200",
      tips: "Respect local customs and photography restrictions inside inner sanctums.",
    },
  ];

  const generatedDays = [];
  for (let i = 0; i < days; i++) {
    const template = dayTemplates[i % dayTemplates.length];
    generatedDays.push({
      day: i + 1,
      title: template.title,
      morning: template.morning,
      afternoon: template.afternoon,
      evening: template.evening,
      meals: template.meals,
      estimatedBudgetINR: template.estimatedBudgetINR,
      tips: template.tips,
    });
  }

  return {
    destination,
    days: generatedDays,
    isFallback: true,
  };
};

export const generateItinerary = async (req, res) => {
  try {
    const body = req.body || {};
    const { destination, days, budget, interests, travelStyle } = body;

    if (!destination || !days) {
      return res.status(400).json({ message: "destination and days are required" });
    }
    const numDays = Math.min(14, Math.max(1, parseInt(days, 10)));

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("No GEMINI_API_KEY found, serving curated itinerary.");
      return res.status(200).json(generateCuratedFallback({ destination, days: numDays, budget, travelStyle }));
    }

    // Call Gemini with a 6-second AbortController timeout to prevent UI hanging
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
              parts: [{ text: buildPrompt({ destination, days: numDays, budget, interests, travelStyle }) }],
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
        if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
          return res.status(200).json(parsed);
        }
      } else {
        const errText = await response.text();
        console.warn("Gemini API error, activating curated plan:", response.status, errText);
      }
    } catch (aiErr) {
      clearTimeout(timeout);
      console.warn("Gemini request timed out or failed:", aiErr.message);
    }

    // Seamless fallback: return curated high-quality plan instantly so the user is never stuck
    const fallbackPlan = generateCuratedFallback({ destination, days: numDays, budget, travelStyle });
    return res.status(200).json(fallbackPlan);
  } catch (err) {
    console.error("Planner generation failed:", err.message);
    res.status(500).json({ message: "Failed to generate itinerary", error: err.message });
  }
};