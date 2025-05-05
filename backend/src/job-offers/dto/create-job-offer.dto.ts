import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsEnum,
  IsArray,
  IsUUID,
  MinLength,
  Min,
  IsNotEmpty,
  MaxLength,
  ArrayNotEmpty,
  ValidateIf,
} from 'class-validator';
import { JobType, JobOfferStatus } from 'generated/prisma';

export class CreateJobOfferDto {
  @ApiProperty({ example: 'Desarrollador Backend NodeJS' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'Buscamos un desarrollador con experiencia en...' })
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  description: string;

  @ApiPropertyOptional({
    description:
      'Required if creating as ADMIN. The ID of the company posting the offer.',
    format: 'uuid',
    example: 'uuid-company-1',
  })
  @IsUUID('4')
  @ValidateIf((_object, value) => value !== undefined) 
  @IsOptional() 
  companyId?: string;

  @ApiProperty({ enum: JobType, example: JobType.FULL_TIME })
  @IsEnum(JobType)
  @IsNotEmpty()
  jobType: JobType;

  @ApiProperty({ example: 'Ciudad de Lima' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  location: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isRemote?: boolean;

  @ApiPropertyOptional({ example: 2500 })
  @IsInt()
  @Min(0)
  @IsOptional()
  salaryMin?: number;

  @ApiPropertyOptional({ example: 3500 })
  @IsInt()
  @Min(0)
  @IsOptional()
  @ValidateIf((o) => o.salaryMin !== undefined)
  @Min(0)
  salaryMax?: number;

  @ApiPropertyOptional({ example: 'PEN' })
  @IsString()
  @IsOptional()
  @MaxLength(3)
  salaryCurrency?: string;

  @ApiPropertyOptional({ enum: JobOfferStatus, example: JobOfferStatus.ACTIVE })
  @IsEnum(JobOfferStatus)
  @IsOptional()
  status?: JobOfferStatus;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiPropertyOptional({
    type: [String],
    format: 'uuid',
    example: ['uuid-skill-1', 'uuid-skill-2'],
    description: 'Array of Skill UUIDs required for the job',
  })
  @IsArray()
  @IsUUID('4', { each: true }) 
  @ArrayNotEmpty()
  @IsOptional() 
  requiredSkillIds?: string[];
}
