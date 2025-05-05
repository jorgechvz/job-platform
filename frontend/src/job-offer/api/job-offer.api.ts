import axios from "axios";
import {
  CreateJobOfferDto,
  JobOffer,
  JobOfferQueryParams,
  PaginatedJobOffersResponse,
  UpdateJobOfferDto,
} from "../types/job-offer.types";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("No auth token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const createJobOfferRequest = async (
  data: CreateJobOfferDto
): Promise<JobOffer> => {
  const response = await axios.post(`${API_URL}/job-offers`, data, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getJobOffersRequest = async (
  params?: JobOfferQueryParams
): Promise<PaginatedJobOffersResponse> => {
  // Lista pública, no requiere Auth típicamente
  const response = await axios.get(`${API_URL}/job-offers`, { params });
  return response.data;
};

export const getJobOfferByIdRequest = async (id: string): Promise<JobOffer> => {
  // Detalle público, no requiere Auth típicamente
  const response = await axios.get(`${API_URL}/job-offers/${id}`);
  return response.data;
};

export const getMyJobOffersRequest = async (
  params?: JobOfferQueryParams
): Promise<JobOffer> => {
  // Requiere Auth (Recruiter)
  const response = await axios.get(`${API_URL}/job-offers/my-offers`, {
    headers: getAuthHeaders(),
    params,
  });
  return response.data;
};

export const getAllJobOffersForAdminRequest = async (
  params?: JobOfferQueryParams
): Promise<PaginatedJobOffersResponse> => {
  // Requiere Auth (Admin)
  const response = await axios.get(`${API_URL}/job-offers/admin/all`, {
    headers: getAuthHeaders(),
    params,
  });
  return response.data;
};

export const updateJobOfferRequest = async (
  id: string,
  data: UpdateJobOfferDto
): Promise<PaginatedJobOffersResponse> => {
  // Requiere Auth (Admin o Recruiter propietario)
  const response = await axios.patch(`${API_URL}/job-offers/${id}`, data, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteJobOfferRequest = async (id: string): Promise<void> => {
  // Requiere Auth (Admin o Recruiter propietario)
  await axios.delete(`${API_URL}/job-offers/${id}`, {
    headers: getAuthHeaders(),
  });
};
