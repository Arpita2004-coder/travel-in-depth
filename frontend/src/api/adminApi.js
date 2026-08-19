import { apiClient } from "./client";

export const getAllDestinations = () => apiClient.get("/destinations");
export const getDestinationBySlug = (slug) => apiClient.get(`/destinations/${slug}`);
export const createDestination = (data) => apiClient.post("/destinations", data);
export const updateDestination = (slug, data) => apiClient.put(`/destinations/${slug}`, data);
export const deleteDestination = (slug) => apiClient.delete(`/destinations/${slug}`);