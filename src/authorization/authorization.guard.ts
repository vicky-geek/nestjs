import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/roles/roles.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log("context=>", context.getClass(),context.getHandler(),context.getType());
    console.log("requiredRoles=>", requiredRoles);

    // No @Roles() on route -> allow any authenticated user
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // AuthGuard must run first and set request.user
    console.log("user=>", user);
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const userRole = user.role;
    const hasRole = requiredRoles.some(
      (role) => role.toUpperCase() === String(userRole).toUpperCase(),
    );

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied. Required role: ${requiredRoles.join(' or ')}`,
      );
    }

    return true;
  }
}
