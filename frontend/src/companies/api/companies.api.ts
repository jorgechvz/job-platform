import axios from "axios";
import {
  Company,
  CompanyQueryParams,
  CreateCompanyDto,
  PaginatedCompaniesResponse,
  UpdateCompanyDto,
} from "../types/companies.types";

const API_URL = import.meta.env.VITE_API_URL;

// Helper para obtener el token y configurar headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// --- Companies API ---

export const createCompanyRequest = async (
  data: CreateCompanyDto
): Promise<Company> => {
  const response = await axios.post(`${API_URL}/companies`, data, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getCompaniesRequest = async (
  params?: CompanyQueryParams
): Promise<PaginatedCompaniesResponse> => {
  const response = await axios.get(`${API_URL}/companies`, { params }); // No requiere Auth para ver lista pública
  return response.data;
};

export const getCompanyByIdRequest = async (id: string): Promise<Company> => {
  const response = await axios.get(`${API_URL}/companies/${id}`); // No requiere Auth para ver detalle público
  return response.data;
};

export const updateCompanyRequest = async (
  id: string,
  data: UpdateCompanyDto
): Promise<Company> => {
  console.log("Updating company with ID:", id, "and data:", data, "and headers:", getAuthHeaders());
  const response = await axios.patch(`${API_URL}/companies/${id}`, data, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteCompanyRequest = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/companies/${id}`, {
    headers: getAuthHeaders(),
  });
};
