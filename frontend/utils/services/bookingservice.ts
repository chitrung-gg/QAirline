import { CreateBookingDto, UpdateBookingDto } from "@/interfaces/booking";
import { api } from "../api/config";

// Booking Service
export const bookingService = {
  create: async (data: CreateBookingDto) => {
    try {
      const response = await api.post(`/booking`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get(`/booking`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await api.get(`/booking/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdateBookingDto) => {
    try {
      const response = await api.patch(`/booking/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await api.delete(`/booking/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  changeStatus: async (id: number, status: string) => { 
    try {
      const response = await api.patch(`/booking/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
