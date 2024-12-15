import { CreateNewsDto, UpdateNewsDto } from "@/interfaces/news";
import { api } from "../api/config";

export const newsService = {
    create: async (data: CreateNewsDto) => {
        try {
            const response = await api.post(`http://localhost:5000/news`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        try {
            const response = await api.get(`http://localhost:5000/news`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getById: async (id: number) => {
        try {
            const response = await api.get(`http://localhost:5000/news/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    update: async (id: number, data: UpdateNewsDto) => {
        try {
            const response = await api.patch(
              `http://localhost:5000/news/${id}`,
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
              `http://localhost:5000/news/${id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};