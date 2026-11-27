import { registerEnumType } from '@nestjs/graphql';
/**
 * Roles de EcoPunto.
 * - citizen:  usuario normal (Camila). Busca puntos, agenda recolecciones, canjea puntos.
 * - operator: operador de un punto de acopio / reciclador. Registra entregas y avanza recolecciones.
 * - admin:    administra usuarios, roles, puntos, categorías y recompensas.
 */
export enum ValidRoles {
  admin = 'admin',
  operator = 'operator',
  citizen = 'citizen',
}

// Registro para que GraphQL conozca los enums
registerEnumType(ValidRoles, { name: 'ValidRoles' });
