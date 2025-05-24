import { CreateNewsDto, UpdateNewsDto } from "@/interfaces/news";
import { api } from "../api/config";

export const newsService = {
    create: async (data: CreateNewsDto) => {
        try {
            const response = await api.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/news`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        try {
            const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/news`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getById: async (id: number) => {
        try {
            const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/news/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    update: async (id: number, data: UpdateNewsDto) => {
        try {
            const response = await api.patch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/news/${id}`,
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
              `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/news/${id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};