import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity.js';
import { ValidRoles } from '../../users/enums/valid-roles.enum.js';
import { META_ROLES } from '../decorators/role-protected.decorator.js';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const validRoles = this.reflector.getAllAndOverride<ValidRoles[]>(
      META_ROLES,
      [context.getHandler(), context.getClass()],
    );
    if (!validRoles || validRoles.length === 0) return true;

    const user = GqlExecutionContext.create(context).getContext<{
      req: { user?: User };
    }>().req.user;
    if (!user) throw new UnauthorizedException('Usuario no autenticado');

    if (user.roles.some((role) => validRoles.includes(role))) return true;

    throw new ForbiddenException(
      `Necesitas uno de estos roles: ${validRoles.join(', ')}`,
    );
  }
}
