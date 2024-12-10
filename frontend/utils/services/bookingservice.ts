import { CreateBookingDto, UpdateBookingDto } from "@/interfaces/booking";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

// Booking Service
export const bookingService = {
  create: async (data: CreateBookingDto) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/booking`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/booking`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/booking/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdateBookingDto) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/booking/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/booking/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  changeStatus: async (id: number, status: string) => { 
    try {
      const response = await axios.patch(`${API_BASE_URL}/booking/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
