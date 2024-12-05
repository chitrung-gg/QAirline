import { CreateUserDto } from "@/interfaces/user";
import { API_BASE_URL } from "../api/config";
import axios from "axios";

// User Service
export const userService = {
  create: async (data: CreateUserDto) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async (token?: string) => {
    try {
      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};

      const response = await axios.get(`${API_BASE_URL}/user`, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
