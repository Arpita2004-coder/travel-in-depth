import { apiClient } from "./client";

/**
 * Search photos using the Unsplash backend proxy
 * @param {string} query - Search keyword (e.g. "Hampi ruins", "Varanasi ghats")
 * @returns {Promise<Array<{ id: string, url: string, thumbUrl: string, alt: string, photographer: string, photographerUrl: string }>>}
 */
export const searchPhotos = (query) => {
  return apiClient.get(`/photos/search?query=${encodeURIComponent(query)}`);
};

/**
 * Bulk search photos using the Unsplash backend proxy
 * @param {string[]} queries - Array of search keywords (max 15)
 * @returns {Promise<Array<{ query: string, results: Array<{ id: string, url: string, thumbUrl: string, alt: string, photographer: string, photographerUrl: string }> }>>}
 */
export const bulkSearchPhotos = (queries) => {
  return apiClient.post("/photos/bulk-search", { queries });
};

