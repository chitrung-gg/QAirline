import { CreateAircraftDto, UpdateAircraftDto } from "@/interfaces/aircraft";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

// Aircraft Service
export const aircraftService = {
  create: async (data: CreateAircraftDto) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/aircraft`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/aircraft`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/aircraft/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdateAircraftDto) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/aircraft/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/aircraft/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
