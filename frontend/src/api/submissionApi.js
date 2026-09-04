import { apiClient } from "./client";

/**
 * Submit a new destination for admin review
 * @param {Object} data - { name, state, region, tagline, bestSeason, budget, ecoOptions, image, lat, lng }
 */
export const createSubmission = (data) => {
  return apiClient.post("/submissions", data);
};

/**
 * Fetch destination submissions created by the logged-in user
 */
export const getMySubmissions = () => {
  return apiClient.get("/submissions/my");
};

/**
 * Fetch all destination submissions (Admin only)
 */
export const getAllSubmissions = () => {
  return apiClient.get("/submissions");
};

/**
 * Approve a destination submission (Admin only)
 * @param {string} id - Submission ID
 */
export const approveSubmission = (id) => {
  return apiClient.patch(`/submissions/${id}/approve`);
};

/**
 * Reject a destination submission (Admin only)
 * @param {string} id - Submission ID
 */
export const rejectSubmission = (id) => {
  return apiClient.patch(`/submissions/${id}/reject`);
};

