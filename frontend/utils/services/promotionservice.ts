import { CreatePromotionDto, UpdatePromotionDto } from "@/interfaces/promotion";
import { api } from "../api/config";

// Promotion Service
export const promotionService = {
  create: async (data: CreatePromotionDto) => {
    try {
      const response = await api.post(`/promotion`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get(`/promotion`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await api.get(`/promotion/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdatePromotionDto) => {
    try {
      const response = await api.patch(
        `/promotion/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await api.delete(`/promotion/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByName: async (name: string) => {
    try {
      const response = await api.get(`/promotion/${name}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};