import Destination from "../models/Destination.js";
import User from "../models/User.js";

// Month index mappings
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Mapping of interests to keywords and destination attributes
const INTEREST_KEYWORDS = {
  heritage: ["heritage", "fort", "palace", "unesco", "history", "pink city", "taj mahal", "mahal", "jaipur", "agra", "hampi", "varanasi"],
  adventure: ["trek", "climb", "bike", "expedition", "mountain", "valley", "ladakh", "spiti", "manali", "himachal", "rishikesh"],
  spiritual: ["temple", "ganga", "ghat", "dargah", "sacred", "spiritual", "peace", "varanasi", "rishikesh", "amritsar", "bodh gaya"],
  wildlife: ["safari", "tiger", "national park", "forest", "ranthambore", "corbett", "kaziranga", "wildlife"],
  coastal: ["beach", "sea", "sand", "ocean", "sun", "goa", "varkala", "gokarna", "andaman", "kerala"],
  beach: ["beach", "sea", "sand", "ocean", "goa", "varkala", "gokarna", "andaman"],
  food: ["food", "cuisine", "thali", "kachori", "spice", "street food", "delicacy"],
  wellness: ["yoga", "ayurveda", "nature", "meditation", "wellness", "kerala", "rishikesh"],
  photography: ["panoramic", "sunset", "lake", "view", "monuments", "scenic"],
  himalayan: ["snow", "himalayan", "ladakh", "spiti", "manali", "shimla", "mountain"],
  cultural: ["culture", "dance", "folk", "art", "rajasthan", "bazaar", "heritage", "festival"],
};

/**
 * Check if the given target month string falls within bestSeason range e.g. "Oct – Mar", "Nov – Feb", "Year-round"
 */
function isMonthInSeason(targetMonth, bestSeasonStr = "") {
  if (!bestSeasonStr || !targetMonth) return false;
  const lower = bestSeasonStr.toLowerCase();
  if (lower.includes("all") || lower.includes("year")) return true;

  // e.g. "Oct – Mar" or "Nov - Feb" or "Sep - Mar"
  const parts = bestSeasonStr.split(/–|-/).map(p => p.trim());
  if (parts.length === 2) {
    const startMonth = parts[0].slice(0, 3);
    const endMonth = parts[1].slice(0, 3);
    const startIndex = MONTH_NAMES.findIndex(m => m.toLowerCase() === startMonth.toLowerCase());
    const endIndex = MONTH_NAMES.findIndex(m => m.toLowerCase() === endMonth.toLowerCase());
    const targetIndex = MONTH_NAMES.findIndex(m => m.toLowerCase() === targetMonth.slice(0, 3).toLowerCase());

    if (startIndex !== -1 && endIndex !== -1 && targetIndex !== -1) {
      if (startIndex <= endIndex) {
        return targetIndex >= startIndex && targetIndex <= endIndex;
      } else {
        // Wraps over year e.g. Oct (9) to Mar (2)
        return targetIndex >= startIndex || targetIndex <= endIndex;
      }
    }
  }

  return lower.includes(targetMonth.slice(0, 3).toLowerCase());
}

/**
 * Score a single destination against criteria
 */
function calculateScore(dest, criteria) {
  const { userInterests = [], budgetTier = "", month = "", region = "" } = criteria;
  let score = 50; // Base score
  const reasons = [];

  const textToScan = `${dest.name} ${dest.state} ${dest.region} ${dest.tagline} ${dest.ecoOptions?.join(" ")}`.toLowerCase();

  // 1. User Interests Matching (Weight: up to 35 points)
  if (userInterests.length > 0) {
    let interestMatches = 0;
    userInterests.forEach(interest => {
      const cleanInterest = interest.toLowerCase().trim();
      const keywords = INTEREST_KEYWORDS[cleanInterest] || [cleanInterest];
      const matched = keywords.some(kw => textToScan.includes(kw));
      if (matched) {
        interestMatches++;
        if (reasons.length < 2) {
          reasons.push(`Matches your interest in ${cleanInterest.charAt(0).toUpperCase() + cleanInterest.slice(1)}`);
        }
      }
    });

    if (interestMatches > 0) {
      score += Math.min(35, interestMatches * 15);
    }
  }

  // 2. Season Alignment (Weight: up to 25 points)
  const currentMonthName = month || MONTH_NAMES[new Date().getMonth()];
  const inSeason = isMonthInSeason(currentMonthName, dest.bestSeason);
  if (inSeason) {
    score += 20;
    reasons.push(`Best time to visit (${dest.bestSeason})`);
  } else {
    score -= 5;
  }

  // 3. Budget Alignment (Weight: up to 20 points)
  if (budgetTier) {
    const bTier = budgetTier.toLowerCase();
    const destBudget = (dest.budget || "").toLowerCase();
    
    // Extract numerical ballpark
    const isBudgetTier = bTier.includes("budget") || bTier.includes("low");
    const isLuxuryTier = bTier.includes("lux");
    const isMidTier = bTier.includes("mid");

    if (isBudgetTier && (destBudget.includes("4k") || destBudget.includes("5k") || destBudget.includes("₹2k") || destBudget.includes("₹4k"))) {
      score += 15;
      reasons.push("Fits your budget preference");
    } else if (isLuxuryTier && (destBudget.includes("20k") || destBudget.includes("25k") || destBudget.includes("30k") || destBudget.includes("15k"))) {
      score += 15;
      reasons.push("Matches luxury travel style");
    } else if (isMidTier) {
      score += 12;
      reasons.push("Balanced mid-range cost");
    }
  }

  // 4. Region Preference (Weight: up to 15 points)
  if (region && dest.region && dest.region.toLowerCase() === region.toLowerCase()) {
    score += 15;
    reasons.push(`Located in ${dest.region} India`);
  }

  // 5. Rating boost
  if (dest.rating) {
    score += Math.round((dest.rating - 4.0) * 10);
  }

  // Clamp score between 60 and 99
  const finalScore = Math.min(99, Math.max(65, score));

  if (reasons.length === 0) {
    reasons.push(`Top-rated ${dest.region} Indian destination`);
  }

  return {
    matchScore: finalScore,
    matchReasons: reasons.slice(0, 3),
  };
}

/**
 * Controller: GET /api/recommendations
 */
export const getRecommendations = async (req, res) => {
  try {
    const { interests, budget, region, month, limit = 8 } = req.query;

    let userInterests = interests ? interests.split(",").map(i => i.trim()) : [];
    let budgetTier = budget || "";
    let preferredRegion = region || "";

    // If user is authenticated, fetch their stored profile preferences
    if (req.userId) {
      const user = await User.findById(req.userId).select("interests location");
      if (user) {
        if (user.interests && user.interests.length > 0 && userInterests.length === 0) {
          userInterests = user.interests;
        }
      }
    }

    // Fetch all active destinations from DB
    const destinations = await Destination.find({});

    const currentMonth = month || MONTH_NAMES[new Date().getMonth()];

    // Calculate score and build recommendation payload
    const scoredDestinations = destinations.map(dest => {
      const destObj = dest.toObject();
      const { matchScore, matchReasons } = calculateScore(destObj, {
        userInterests,
        budgetTier,
        month: currentMonth,
        region: preferredRegion,
      });

      return {
        ...destObj,
        matchScore,
        matchReasons,
      };
    });

    // Sort descending by matchScore, then rating
    scoredDestinations.sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return b.rating - a.rating;
    });

    const results = scoredDestinations.slice(0, parseInt(limit, 10));

    res.status(200).json({
      meta: {
        activeMonth: currentMonth,
        userInterests,
        total: results.length,
      },
      destinations: results,
    });
  } catch (err) {
    console.error("Failed to generate recommendations:", err);
    res.status(500).json({ message: "Failed to generate recommendations", error: err.message });
  }
};
