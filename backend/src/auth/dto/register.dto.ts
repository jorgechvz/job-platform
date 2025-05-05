import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'newuser@example.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email should not be empty.' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (min 6 characters)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
