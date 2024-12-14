import { CreateUserDto } from "@/interfaces/user";
import { api } from "../api/config";

// User Service
export const userService = {
  create: async (data: CreateUserDto) => {
    try {
      const response = await api.post(`/user`, data);
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

      const response = await api.get(`/user`, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
