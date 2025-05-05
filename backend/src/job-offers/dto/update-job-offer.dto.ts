// filepath: /Users/Jorge/Personal/job-platform/backend/src/job-offers/dto/update-job-offer.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateJobOfferDto } from './create-job-offer.dto';

export class UpdateJobOfferDto extends PartialType(CreateJobOfferDto) {}