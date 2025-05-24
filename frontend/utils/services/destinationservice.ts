import { CreateDestinationDto, UpdateDestinationDto } from "@/interfaces/destination";
import { api } from "../api/config";

export const destinationService = {
    create: async (data: CreateDestinationDto) => {
        try {
            const response = await api.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/destination`,
              data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        try {
            const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/destination`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getById: async (id: number) => {
        try {
            const response = await api.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/destination/${id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    update: async (id: number, data: UpdateDestinationDto) => {
        try {
            const response = await api.patch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/destination/${id}`,
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
              `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/destination/${id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};