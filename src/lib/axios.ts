// /lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Добавляем перехватчик для установки токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Добавляем перехватчик для обработки ошибок

export default api;
