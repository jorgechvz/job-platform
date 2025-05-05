import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsUrl,
  MaxLength,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Innovatech Solutions Perú' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'Tecnología y Software' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  industry?: string;

  @ApiPropertyOptional({ example: 'Lima, Perú' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  location?: string;

  @ApiPropertyOptional({ example: '50-200 empleados' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  size?: string;

  @ApiPropertyOptional({ example: 'contacto@innovatech.pe' })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @ApiPropertyOptional({ example: 'https://innovatech.pe' })
  @IsUrl()
  @IsOptional()
  websiteUrl?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/logos/innovatech.png' })
  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @ApiPropertyOptional({ example: 'Empresa líder en desarrollo de software...' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: false, description: 'Admin sets this usually' })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
}