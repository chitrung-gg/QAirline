import { CreateFlightDto, Flight, UpdateFlightDto } from "@/interfaces/flight";
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
      const response = await api.post(`/flight`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get(`/flight`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await api.get(`/flight/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAircraftById: async (id: number) => {
    try {
      const response = await api.get(`/flight/${id}/aircraft`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: number, data: UpdateFlightDto) => {
    try {
      const response = await api.patch(
        `http://localhost:5000/flight/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await api.delete(`http://localhost:5000/flight/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchFlights: async (params: FlightSearchParams): Promise<Flight[]> => {
    try {
      const response = await api.get(`http://localhost:5000/flight/`, {
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