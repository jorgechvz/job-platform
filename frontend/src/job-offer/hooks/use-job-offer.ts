import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  JobOfferQueryParams,
  UpdateJobOfferDto,
} from "../types/job-offer.types";
import {
  createJobOfferRequest,
  deleteJobOfferRequest,
  getAllJobOffersForAdminRequest,
  getJobOfferByIdRequest,
  getJobOffersRequest,
  getMyJobOffersRequest,
  updateJobOfferRequest,
} from "../api/job-offer.api";
import { useAuth } from "@/auth/hooks/use-auth";

const useJobOffer = (params?: JobOfferQueryParams, jobOfferId?: string) => {
  const queryClient = useQueryClient();
  const { userRole } = useAuth();

  const getJobOffers = useQuery({
    queryKey: ["jobOffers", params],
    queryFn: () => getJobOffersRequest(params),
  });

  const getMyJobOffers = useQuery({
    queryKey: ["myJobOffers", params],
    queryFn: () => getMyJobOffersRequest(params),
    enabled: userRole() === "RECRUITER",
  });

  const getAllJobOffersForAdmin = useQuery({
    queryKey: ["adminOffers", params],
    queryFn: () => getAllJobOffersForAdminRequest(params),
    enabled: userRole() === "ADMIN",
  });

  const getJobOffersById = useQuery({
    queryKey: ["jobOffer", jobOfferId],
    queryFn: () => getJobOfferByIdRequest(jobOfferId as string),
    enabled: !!jobOfferId,
  });

  const createJobOffer = useMutation({
    mutationFn: createJobOfferRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobOffers"] });
    },
    onError: (error) => {
      console.error("Error creating job offer:", error);
    },
  });

  const updateJobOffer = useMutation({
    mutationFn: (data: { id: string; data: UpdateJobOfferDto }) =>
      updateJobOfferRequest(data.id, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobOffers"] });
      queryClient.invalidateQueries({ queryKey: ["myJobOffers"] });
      queryClient.invalidateQueries({ queryKey: ["adminOffers"] });
    },
    onError: (error) => {
      console.error("Error updating job offer:", error);
    },
  });

  const deleteJobOffer = useMutation({
    mutationFn: (id: string) => deleteJobOfferRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobOffers"] });
      if (jobOfferId) {
        queryClient.invalidateQueries({ queryKey: ["jobOffer", jobOfferId] });
      }
    },
    onError: (error) => {
      console.error("Error deleting job offer:", error);
    },
  });

  return {
    getJobOffers,
    getJobOffersById,
    getMyJobOffers,
    getAllJobOffersForAdmin,
    createJobOffer,
    updateJobOffer,
    deleteJobOffer,
  };
};

export default useJobOffer;
