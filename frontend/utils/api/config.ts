import axios, { InternalAxiosRequestConfig } from "axios";
import { config } from "process";

const api = axios.create({
    baseURL: process.env.BACKEND_URL,
    timeout: 10000,
})
