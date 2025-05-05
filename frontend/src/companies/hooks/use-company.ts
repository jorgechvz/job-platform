import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCompanyRequest,
  deleteCompanyRequest,
  getCompaniesRequest,
  getCompanyByIdRequest,
  updateCompanyRequest,
} from "../api/companies.api";
import { CompanyQueryParams, UpdateCompanyDto } from "../types/companies.types";

const useCompany = (params?: CompanyQueryParams, companyId?: string) => {
  const queryClient = useQueryClient();
  const getAllCompanies = useQuery({
    queryKey: ["companies", params],
    queryFn: () => getCompaniesRequest(params),
  });

  const getCompany = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => getCompanyByIdRequest(companyId as string),
    enabled: !!companyId, // Solo se ejecuta si companyId está definido
  });

  const createCompany = useMutation({
    mutationFn: createCompanyRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] }); // Invalida la caché de empresas para refrescar la lista
    },
    onError: (error) => {
      console.error("Error creating company:", error);
    },
  });

  const updateCompany = useMutation({
    mutationFn: (data: { id: string; data: UpdateCompanyDto }) =>
      updateCompanyRequest(data.id, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] }); // Invalida la caché de empresas para refrescar la lista
      if (companyId) {
        queryClient.invalidateQueries({ queryKey: ["company", companyId] }); // Invalida la caché de la empresa específica
      }
    },
    onError: (error) => {
      console.error("Error updating company:", error);
    },
  });

  const deleteCompany = useMutation({
    mutationFn: (id: string) => deleteCompanyRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] }); // Invalida la caché de empresas para refrescar la lista
      if (companyId) {
        queryClient.invalidateQueries({ queryKey: ["company", companyId] }); // Invalida la caché de la empresa específica
      }
    },
    onError: (error) => {
      console.error("Error deleting company:", error);
    },
  });

  return {
    getAllCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany,
  };
};

export default useCompany;
