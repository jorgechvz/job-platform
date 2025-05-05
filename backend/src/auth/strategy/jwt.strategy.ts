import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';

interface JwtPayload {
  sub: string; 
  email: string;
  role: string; 
  name?: string;
  iat?: number; 
  exp?: number; 
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService, 
  ) {
    super({
      // Extrae el token del header 'Authorization' como Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Ignora la expiración aquí, Passport se encarga de verificarla por defecto
      ignoreExpiration: false,
      // Obtiene el secreto JWT desde la configuración (variables de entorno)
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Método de validación que Passport invoca después de verificar la firma y expiración del JWT.
   * @param payload El payload decodificado del JWT.
   * @returns El objeto que se adjuntará a `request.user`.
   * @throws UnauthorizedException si la validación falla.
   */
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    console.log('Validating JWT payload:', payload);
    // 1. Validación básica del payload (asegura que los campos necesarios existan)
    if (!payload.sub || !payload.email || !payload.role) {
      throw new UnauthorizedException('Invalid token payload.');
    }

    // 2. Validar si el usuario aún existe en la base de datos.
    // Esto previene que tokens válidos de usuarios eliminados sigan funcionando.

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true }, // Selecciona solo lo necesario
    });

    if (!user) {
      throw new UnauthorizedException('User associated with token not found.');
    }

    if (user.role !== payload.role) {
      throw new UnauthorizedException('User role mismatch.');
    }
    // 3. Si todo está bien, devuelve el payload.
    // Este payload estará disponible en `req.user` en los controladores protegidos.
    // Asegúrate que contenga toda la información necesaria para tus guards (como 'role').
    return payload;
  }
}
