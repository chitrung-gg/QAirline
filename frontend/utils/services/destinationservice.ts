import { CreateDestinationDto, UpdateDestinationDto } from "@/interfaces/destination";
import { api } from "../api/config";

export const destinationService = {
    create: async (data: CreateDestinationDto) => {
        try {
            const response = await api.post(
              `http://localhost:5000/destination`,
              data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        try {
            const response = await api.get(`http://localhost:5000/destination`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getById: async (id: number) => {
        try {
            const response = await api.get(
              `http://localhost:5000/destination/${id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    update: async (id: number, data: UpdateDestinationDto) => {
        try {
            const response = await api.patch(
              `http://localhost:5000/destination/${id}`,
              data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    delete: async (id: number) => {
        try {
            const response = await api.delete(
              `http://localhost:5000/destination/${id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};