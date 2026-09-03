import { apiClient } from "./client";

/**
 * Fetch real-time weather & 5-day forecast
 * @param {Object} params - { slug, lat, lng }
 */
export const fetchWeather = (params = {}) => {
  const query = new URLSearchParams();
  if (params.slug) query.set("slug", params.slug);
  if (params.lat) query.set("lat", params.lat);
  if (params.lng) query.set("lng", params.lng);

  const queryString = query.toString();
  return apiClient.get(`/weather${queryString ? `?${queryString}` : ""}`);
};
