import { Company } from "@/companies/types/companies.types";

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  INTERNSHIP = "INTERNSHIP",
  FREELANCE = "FREELANCE",
}

export enum JobOfferStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  CLOSED = "CLOSED",
}

export interface CreateJobOfferDto {
  title: string;
  description: string;
  companyId?: string;
  jobType: JobType;
  location: string;
  isRemote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  status?: JobOfferStatus;
  isFeatured?: boolean;
  requiredSkillIds?: string[];
}

export interface UpdateJobOfferDto extends Partial<CreateJobOfferDto> {}

export interface Skill {
  id: string;
  name: string;
}

export interface SimpleUser {
  id: string;
  name: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export interface JobOffer {
  id: string;
  title: string;
  description: string;
  companyId: string;
  company: Partial<Company>;
  postedById: string | null;
  postedBy: SimpleUser | null;
  jobType: JobType;
  location: string;
  isRemote: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  status: JobOfferStatus;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  requiredSkills: Skill[];
  _count?: {
    applications?: number;
  };
}

export interface JobOfferQueryParams {
  skip?: number;
  take?: number;
  title?: string;
  companyId?: string;
  jobType?: JobType;
  location?: string;
  isRemote?: boolean;
  minSalary?: number;
  status?: JobOfferStatus;
  isFeatured?: boolean;
  skillIds?: string[];
  orderBy?: string;
}

export interface PaginatedJobOffersResponse {
  data: JobOffer[];
  count: number;
}
