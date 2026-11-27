import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../../users/enums/valid-roles.enum.js';
import { GqlAuthGuard } from '../guards/gql-auth.guard.js';
import { UserRoleGuard } from '../guards/user-role.guard.js';
import { RoleProtected } from './role-protected.decorator.js';

/**
 * Protege una query/mutation con JWT y, opcionalmente, roles.
 *
 *   @Auth()                    -> cualquier usuario autenticado
 *   @Auth(ValidRoles.admin)    -> solo admin ("superadmin" del enunciado)
 */
export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(GqlAuthGuard, UserRoleGuard),
  );
}
