import { CreateUserDto } from "@/interfaces/user";
import { api } from "../api/config";

// User Service
export const userService = {
  create: async (data: CreateUserDto) => {
    try {
      const response = await api.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/user`, data);
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

      const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/user`, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
