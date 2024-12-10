import { CreateFlightDto, Flight, UpdateFlightDto } from "@/interfaces/flight";
import axios from "axios";
import { api } from "../api/config";
import { isRouteErrorResponse } from "react-router-dom";

export interface FlightSearchParams {
  isRoundTrip: boolean;
  departure: string;
  destination: string;
  departureDate: Date;
  returnDate?: Date;
}

export const flightService = {
  create: async (data: CreateFlightDto) => {
    try {
      const response = await axios.post(`${api}/flight`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${api}/flight`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await axios.get(`${api}/flight/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAircraftById: async (id: number) => {
    try {
      const response = await axios.get(`${api}/flight/${id}/aircraft`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdateFlightDto) => {
    try {
      const response = await axios.patch(`${api}/flight/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${api}/flight/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchFlights: async (params: FlightSearchParams): Promise<Flight[]> => {
    try {
      const response = await axios.get(`${api}/flight/`, {
        params: {
          isRoundTrip: params.isRoundTrip,
          departureAirport: params.departure,
          arrivalAirport: params.destination,
          departureDate: params.departureDate.toISOString(),
          returnDate: params.returnDate
            ? params.returnDate.toISOString()
            : undefined,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flight search error:", error);
      throw error;
    }
  },

  
};