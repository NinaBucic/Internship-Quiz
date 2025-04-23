import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "../constants";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const tokenItem = localStorage.getItem("jwt");

  if (tokenItem) {
    const token = JSON.parse(tokenItem);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

type ErrorResponse = AxiosError & {
  response: AxiosResponse<{
    statusCode: number;
    message: string;
    error: string;
  }>;
};

api.interceptors.response.use(
  (response) => response.data,

  (error: ErrorResponse) => {
    if (error.response) {
      return Promise.reject(error.response.data.message || error.message);
    }

    return Promise.reject("Network error");
  }
);
