import axios from "axios";
import { refreshToken } from "@/actions/auth/refreshToken";
import { apiUrls } from "@/lib/apiUrls";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Create axios instance
export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Set up a request interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      (originalRequest.url === apiUrls.internal.auth.refreshToken() ||
        originalRequest.url === apiUrls.internal.auth.login())
    ) {
      return Promise.reject(error.response);
    }

    // Check if the error is a 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token on interceptor:", refreshError);
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
