import { CreateFlightDto, UpdateFlightDto } from "@/interfaces/flight";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

export const flightService = {
  create: async (data: CreateFlightDto) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/flight`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/flight`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/flight/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAircraftById: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/flight/${id}/aircraft`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdateFlightDto) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/flight/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/flight/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};