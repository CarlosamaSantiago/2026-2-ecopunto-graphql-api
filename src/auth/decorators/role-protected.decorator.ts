import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../../users/enums/valid-roles.enum.js';

export const META_ROLES = 'roles';

export const RoleProtected = (...roles: ValidRoles[]) =>
  SetMetadata(META_ROLES, roles);
