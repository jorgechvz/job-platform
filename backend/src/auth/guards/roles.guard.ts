import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from 'generated/prisma';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.role) {
      throw new ForbiddenException('User role not found in token payload.');
    }

    // Verifica si el rol del usuario está incluido en los roles requeridos
    const hasPermission = requiredRoles.some((role) => user.role === role);

    if (!hasPermission) {
      throw new ForbiddenException(
        `User with role ${user.role} does not have access. Required roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
