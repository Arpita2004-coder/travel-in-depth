import { apiClient } from "./client";

export const getAllDestinations = () => apiClient.get("/destinations");
export const getDestinationBySlug = (slug) => apiClient.get(`/destinations/${slug}`);