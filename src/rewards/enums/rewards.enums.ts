import { registerEnumType } from '@nestjs/graphql';
/** Origen de un movimiento de EcoPuntos (historial del perfil). */
export enum EcoPointTransactionType {
  PICKUP = 'PICKUP', // Recolección a domicilio completada (+)
  DROP_OFF = 'DROP_OFF', // Entrega en punto (+)
  REDEMPTION = 'REDEMPTION', // Canje de cupón (-)
  ADJUSTMENT = 'ADJUSTMENT', // Ajuste manual del admin (+/-)
}

/**
 * Niveles por EcoPuntos acumulados (pantalla "Mis recompensas").
 * Ordenados de menor a mayor.
 */
export const ECO_LEVELS = [
  { name: 'Semilla', minPoints: 0 },
  { name: 'Brote', minPoints: 300 },
  { name: 'Guardián verde', minPoints: 1000 },
  { name: 'Héroe del planeta', minPoints: 1500 },
] as const;

// Registro para que GraphQL conozca los enums
registerEnumType(EcoPointTransactionType, { name: 'EcoPointTransactionType' });
