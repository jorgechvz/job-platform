import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Role } from 'generated/prisma';
import { RolesGuard } from './guards/roles.guard';
import { UserEntity } from './entity/auth.entity';
import { Roles } from './guards/roles.decorator';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    type: UserEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request (validation failed).' })
  @ApiResponse({ status: 409, description: 'Conflict (email already exists).' })
  async register(@Body() registerDto: RegisterDto): Promise<UserEntity> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns JWT token.',
    schema: { example: { access_token: 'jwt_token_string' } },
  })
  @ApiResponse({ status: 400, description: 'Bad Request (validation failed).' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized (invalid credentials).',
  })
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }


  @UseGuards(JwtAuthGuard) 
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current logged-in user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns user profile.',
    type: UserEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized (token invalid or missing).',
  })
  async getProfile(@Request() req): Promise<UserEntity> {
    // req.user contiene el payload validado por JwtStrategy
    // Pasamos el ID del usuario al servicio para obtener el perfil completo
    return this.authService.getProfile(req.user.sub); // 'sub' es el ID del usuario en el payload
  }

  // Ejemplo de endpoint protegido por rol
  @UseGuards(JwtAuthGuard, RolesGuard) // Aplica ambos guards
  @Roles(Role.ADMIN) // Solo usuarios con rol ADMIN pueden acceder
  @Get('admin-data')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get admin-specific data (requires ADMIN role)' })
  @ApiResponse({ status: 200, description: 'Returns admin data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (user does not have ADMIN role).',
  })
  getAdminData(@Request() req) {
    return {
      message: `Welcome Admin ${req.user.name}! This is protected data.`,
    };
  }
}
