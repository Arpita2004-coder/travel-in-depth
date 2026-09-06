/**
 * Photo Controller - Unsplash Search API integration
 */
export const searchPhotos = async (req, res) => {
  try {
    const { query, per_page = 15 } = req.query;

    if (!query || typeof query !== "string" || !query.trim()) {
      return res.status(400).json({ message: "Query parameter 'query' is required." });
    }

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      return res.status(503).json({
        message:
          "Unsplash Access Key is not configured. Please add UNSPLASH_ACCESS_KEY to your backend .env file.",
      });
    }

    const url = new URL("https://api.unsplash.com/search/photos");
    url.searchParams.set("query", query.trim());
    url.searchParams.set("per_page", String(per_page));
    url.searchParams.set("orientation", "landscape");

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1",
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Unsplash API error:", response.status, errorBody);
      return res.status(response.status).json({
        message: `Unsplash API responded with status ${response.status}`,
        error: errorBody,
      });
    }

    const data = await response.json();
    const results = (data.results || []).map((photo) => ({
      id: photo.id,
      url: photo.urls?.regular || photo.urls?.small,
      thumbUrl: photo.urls?.thumb || photo.urls?.small,
      alt: photo.alt_description || photo.description || query,
      photographer: photo.user?.name || "Unknown Photographer",
      photographerUrl: photo.user?.links?.html
        ? `${photo.user.links.html}?utm_source=travel_in_depth&utm_medium=referral`
        : "https://unsplash.com",
    }));

    return res.status(200).json(results);
  } catch (err) {
    console.error("Failed to search photos:", err.message);
    return res.status(500).json({
      message: "Failed to search photos from Unsplash",
      error: err.message,
    });
  }
};

/**
 * Bulk Search Photos - Unsplash Search for multiple queries in parallel with a cap
 * POST /api/photos/bulk-search
 * Body: { queries: string[] } (max 15 queries)
 */
export const bulkSearchPhotos = async (req, res) => {
  try {
    const { queries } = req.body;

    if (!Array.isArray(queries) || queries.length === 0) {
      return res.status(400).json({ message: "Body must contain a non-empty array of 'queries'." });
    }

    // Free tier Unsplash limit is 50 req/hour. Limit batch size to max 15 queries.
    if (queries.length > 15) {
      return res.status(400).json({
        message: "Maximum 15 queries allowed per bulk request to prevent rate limiting.",
      });
    }

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      return res.status(503).json({
        message:
          "Unsplash Access Key is not configured. Please add UNSPLASH_ACCESS_KEY to your backend .env file.",
      });
    }

    // Process searches concurrently
    const searchPromises = queries.map(async (rawQuery) => {
      const q = typeof rawQuery === "string" ? rawQuery.trim() : "";
      if (!q) {
        return { query: rawQuery, results: [] };
      }

      const url = new URL("https://api.unsplash.com/search/photos");
      url.searchParams.set("query", q);
      url.searchParams.set("per_page", "3");
      url.searchParams.set("orientation", "landscape");

      try {
        const response = await fetch(url.toString(), {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
            "Accept-Version": "v1",
          },
        });

        if (response.status === 403 || response.status === 429) {
          throw new Error("UNSPLASH_RATE_LIMITED");
        }

        if (!response.ok) {
          console.warn(`Unsplash bulk search for "${q}" returned status ${response.status}`);
          return { query: rawQuery, results: [] };
        }

        const data = await response.json();
        const results = (data.results || []).slice(0, 3).map((photo) => ({
          id: photo.id,
          url: photo.urls?.regular || photo.urls?.small,
          thumbUrl: photo.urls?.thumb || photo.urls?.small,
          alt: photo.alt_description || photo.description || q,
          photographer: photo.user?.name || "Unknown Photographer",
          photographerUrl: photo.user?.links?.html
            ? `${photo.user.links.html}?utm_source=travel_in_depth&utm_medium=referral`
            : "https://unsplash.com",
        }));

        return { query: rawQuery, results };
      } catch (err) {
        if (err.message === "UNSPLASH_RATE_LIMITED") {
          throw err;
        }
        console.warn(`Failed search for query "${q}":`, err.message);
        return { query: rawQuery, results: [] };
      }
    });

    const bulkResults = await Promise.all(searchPromises);
    return res.status(200).json(bulkResults);
  } catch (err) {
    if (err.message === "UNSPLASH_RATE_LIMITED") {
      return res.status(429).json({
        message: "Unsplash hourly rate limit exceeded (50 requests/hour free tier). Please wait a few minutes before trying again.",
      });
    }
    console.error("Failed in bulkSearchPhotos:", err);
    return res.status(500).json({
      message: "Failed to perform bulk photo search",
      error: err.message,
    });
  }
};

