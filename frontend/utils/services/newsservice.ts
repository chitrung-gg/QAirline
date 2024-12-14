import { CreateNewsDto, UpdateNewsDto } from "@/interfaces/news";
import { api } from "../api/config";

export const newsService = {
    create: async (data: CreateNewsDto) => {
        try {
            const response = await api.post(`/news`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        try {
            const response = await api.get(`/news`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getById: async (id: number) => {
        try {
            const response = await api.get(`/news/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    update: async (id: number, data: UpdateNewsDto) => {
        try {
            const response = await api.patch(`/news/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    delete: async (id: number) => {
        try {
            const response = await api.delete(`/news/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};