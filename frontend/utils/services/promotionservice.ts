import { CreatePromotionDto, UpdatePromotionDto } from "@/interfaces/promotion";
import { api } from "../api/config";

// Promotion Service
export const promotionService = {
  create: async (data: CreatePromotionDto) => {
    try {
      const response = await api.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/promotion`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/promotion`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/promotion/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdatePromotionDto) => {
    try {
      const response = await api.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/promotion/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await api.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/promotion/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByName: async (name: string) => {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/promotion/${name}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};