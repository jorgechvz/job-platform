import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Prisma, User } from 'generated/prisma';
import { UserEntity } from './entity/auth.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registra un nuevo usuario.
   * @param dto Datos de registro del usuario.
   * @returns El usuario creado (sin contraseña).
   * @throws ConflictException si el email ya existe.
   * @throws InternalServerErrorException si ocurre un error inesperado.
   */

  async register(dto: RegisterDto): Promise<UserEntity> {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          passwordHash: hashedPassword,
          // El rol se asigna por defecto según el schema (STUDENT)
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user; // Excluye el hash de la respuesta
      return new UserEntity(result);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Código P2002 indica violación de constraint único (email en este caso)
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Email '${dto.email}' is already registered.`,
          );
        }
      }
      // Loggear el error real para depuración
      console.error('Registration Error:', error);
      throw new InternalServerErrorException('Could not register user.');
    }
  }

  /**
   * Valida las credenciales del usuario.
   * @param email Email del usuario.
   * @param pass Contraseña proporcionada.
   * @returns El objeto User completo si las credenciales son válidas, null en caso contrario.
   */

  private async validateUser(
    email: string,
    pass: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Verifica si el usuario existe y tiene passwordHash
    if (!user || !user.passwordHash) {
      return null;
    }

    // Compara la contraseña proporcionada con el hash almacenado
    const isPasswordMatching = await bcrypt.compare(pass, user.passwordHash);

    if (isPasswordMatching) {
      return user; // Devuelve el usuario completo si la contraseña coincide
    }

    return null; // Contraseña incorrecta
  }

  /**
   * Inicia sesión de un usuario.
   * @param dto Credenciales de login.
   * @returns Un objeto con el token de acceso JWT.
   * @throws UnauthorizedException si las credenciales son inválidas.
   */

  async login(dto: LoginDto): Promise<{ access_token: string   }> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials provided.');
    }

    // Payload del JWT: incluye información esencial y no sensible
    const payload = {
      sub: user.id, // 'subject', convencionalmente el ID del usuario
      email: user.email,
      role: user.role, // Incluye el rol para usarlo en guards
      name: user.name, // Incluye el nombre si existe
    };

    // Genera el token JWT usando el servicio JwtService
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  } 

  /**
   * Obtiene el perfil del usuario basado en su ID.
   * @param userId ID del usuario.
   * @returns El perfil del usuario (sin contraseña).
   * @throws NotFoundException si el usuario no se encuentra.
   */

  async getProfile(userId: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user; // Excluye el hash
    return new UserEntity(result);
  }
}
