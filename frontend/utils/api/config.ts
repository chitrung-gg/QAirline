import axios, { InternalAxiosRequestConfig } from "axios";
import { config } from "process";

export const api = axios.create({
    baseURL: process.env.BACKEND_URL,
    timeout: 10000,
})

// // Base URL for your API
// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
