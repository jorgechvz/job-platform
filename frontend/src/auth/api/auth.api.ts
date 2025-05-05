import axios from "axios";
import { LoginType, RegisterType } from "../types/auth.types";

const API_URL = import.meta.env.VITE_API_URL;

export const loginRequest = async (data: LoginType) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

export const registerRequest = async (data: RegisterType) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};

export const currentUserRequest = async () => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
