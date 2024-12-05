import { CreatePromotionDto, UpdatePromotionDto } from "@/interfaces/promotion";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

// Promotion Service
export const promotionService = {
  create: async (data: CreatePromotionDto) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/promotion`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/promotion`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/promotion/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdatePromotionDto) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/promotion/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/promotion/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
