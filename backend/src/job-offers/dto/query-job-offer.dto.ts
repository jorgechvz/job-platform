import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsEnum,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { JobType, JobOfferStatus } from 'generated/prisma';

export class QueryJobOfferDto {
  @ApiPropertyOptional({ description: 'Filter by job title (partial match)' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Filter by company ID' })
  @IsOptional()
  @IsUUID()
  companyId?: string;

  @ApiPropertyOptional({ enum: JobType, description: 'Filter by job type' })
  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType;

  @ApiPropertyOptional({ description: 'Filter by location (partial match)' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Filter by remote status' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true) 
  isRemote?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by minimum salary (greater than or equal)',
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  minSalary?: number;

  @ApiPropertyOptional({
    enum: JobOfferStatus,
    description: 'Filter by status',
  })
  @IsOptional()
  @IsEnum(JobOfferStatus)
  status?: JobOfferStatus;

  @ApiPropertyOptional({ description: 'Filter by featured status' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isFeatured?: boolean;

  @ApiPropertyOptional({
    type: [String],
    format: 'uuid',
    description: 'Filter by required skill IDs (match all)',
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  skillIds?: string[];

  @ApiPropertyOptional({ description: 'Records to skip (pagination)' })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  skip?: number;

  @ApiPropertyOptional({ description: 'Records to take (pagination)' })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  take?: number;

  @ApiPropertyOptional({ description: 'Sort order (e.g., createdAt:desc)' })
  @IsOptional()
  @IsString() 
  orderBy?: string;

}
