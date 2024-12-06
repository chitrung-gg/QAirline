import { CreateAirportDto, UpdateAirportDto } from "@/interfaces/airport";
import { API_BASE_URL } from "../api/config";
import axios from "axios";

export const airportService = {
  create: async (data: CreateAirportDto) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/airport`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/airport`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/airport/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdateAirportDto) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/airport/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/airport/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
