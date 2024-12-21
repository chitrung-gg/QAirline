import { CreatePromotionDto, UpdatePromotionDto } from "@/interfaces/promotion";
import { api } from "../api/config";

// Promotion Service
export const promotionService = {
  create: async (data: CreatePromotionDto) => {
    try {
      const response = await api.post(`http://localhost:5000/promotion`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get(`http://localhost:5000/promotion`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await api.get(`http://localhost:5000/promotion/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdatePromotionDto) => {
    try {
      const response = await api.patch(
        `http://localhost:5000/promotion/${id}`,
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
        `http://localhost:5000/promotion/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByName: async (name: string) => {
    try {
      const response = await api.get(`http://localhost:5000/promotion/${name}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};