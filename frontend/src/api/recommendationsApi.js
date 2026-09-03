import { apiClient } from "./client";

/**
 * Fetch smart destination recommendations
 * @param {Object} params - { interests, budget, region, month, limit }
 */
export const fetchRecommendations = (params = {}) => {
  const query = new URLSearchParams();
  if (params.interests) {
    const list = Array.isArray(params.interests) ? params.interests.join(",") : params.interests;
    query.set("interests", list);
  }
  if (params.budget) query.set("budget", params.budget);
  if (params.region) query.set("region", params.region);
  if (params.month) query.set("month", params.month);
  if (params.limit) query.set("limit", params.limit);

  const queryString = query.toString();
  return apiClient.get(`/recommendations${queryString ? `?${queryString}` : ""}`);
};
