import { CreateAircraftDto, UpdateAircraftDto } from "@/interfaces/aircraft";
import { api } from "../api/config";

// Aircraft Service
export const aircraftService = {
  create: async (data: CreateAircraftDto) => {
    try {
      const response = await api.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/aircraft`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/aircraft`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/aircraft/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdateAircraftDto) => {
    try {
      const response = await api.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/aircraft/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await api.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/aircraft/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
