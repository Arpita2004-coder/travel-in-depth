import { apiClient } from "./client";

export const signup = (name, email, password) =>
  apiClient.post("/auth/signup", { name, email, password });

export const login = (email, password) =>
  apiClient.post("/auth/login", { email, password });

export const getMe = () => apiClient.get("/auth/me");