import { ValidRoles } from '../../users/enums/valid-roles.enum.js';

/**
 * Lo que viaja dentro del JWT. El front lo decodifica para mostrar el nombre
 * y esconder/mostrar opciones según roles (la validación real es del backend).
 */
export interface JwtPayload {
  id: string;
  email: string;
  fullName: string;
  roles: ValidRoles[];
  /** tokenVersion del usuario al firmar. Si cambia (logout), el token muere. */
  tv: number;
  /** 'access' = token normal. '2fa' = token temporal entre login y código TOTP. */
  purpose: 'access' | '2fa';
}
