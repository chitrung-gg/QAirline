import { CreateAirportDto, UpdateAirportDto } from "@/interfaces/airport";
import { api } from "../api/config";

export const airportService = {
  create: async (data: CreateAirportDto) => {
    try {
      const response = await api.post(`/airport`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get(`/airport`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await api.get(`/airport/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdateAirportDto) => {
    try {
      const response = await api.patch(`/airport/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await api.delete(`/airport/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
