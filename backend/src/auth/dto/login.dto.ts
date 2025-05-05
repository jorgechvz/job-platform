import { ApiProperty } from '@nestjs/swagger'; 
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// Swagger se usa para crear documentacion de la API mira en esta ruta si quieres entender mas 
// https://localhost:3000/api-docs
// Se usa ApiProperty para documentar las propiedades de la clase, lo que ayuda a generar la documentación de la API automáticamente.
export class LoginDto {
  @ApiProperty({ example: 'test@example.com', description: 'User email address' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty({ message: 'Email should not be empty.' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password (min 6 characters)' })
  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;
}