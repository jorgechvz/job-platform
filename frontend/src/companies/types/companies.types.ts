import { JobOffer } from "@/job-offer/types/job-offer.types";

export interface CreateCompanyDto {
  name: string;
  industry?: string;
  location?: string;
  size?: string;
  contactEmail?: string;
  websiteUrl?: string;
  logoUrl?: string;
  description?: string;
  isVerified?: boolean;
}

export interface UpdateCompanyDto extends Partial<CreateCompanyDto> {}

export interface Company {
  id: string;
  name: string;
  industry: string | null;
  location: string | null;
  size: string | null;
  contactEmail: string | null;
  websiteUrl: string | null;
  logoUrl: string | null;
  description: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  jobOffers?: JobOffer[];
}

export interface CompanyQueryParams {
  skip?: number;
  take?: number;
  name?: string;
  location?: string;
}

export interface PaginatedCompaniesResponse {
  data: Company[];
  count: number;
}
