import { registerEnumType } from '@nestjs/graphql';
/**
 * Estados de una recolección a domicilio (pantallas "14 Seguimiento" del Figma).
 *
 *   SCHEDULED ──► ON_THE_WAY ──► PICKED_UP ──► DELIVERED
 *       │              │
 *       └──────────────┴──► CANCELLED
 */
export enum PickupStatus {
  SCHEDULED = 'SCHEDULED', // Agendada
  ON_THE_WAY = 'ON_THE_WAY', // En camino
  PICKED_UP = 'PICKED_UP', // Recogida
  DELIVERED = 'DELIVERED', // Entregada al operador autorizado
  CANCELLED = 'CANCELLED',
}

/** Transiciones permitidas. Úsalo en el servicio para validar cambios de estado. */
export const PICKUP_TRANSITIONS: Record<PickupStatus, PickupStatus[]> = {
  [PickupStatus.SCHEDULED]: [PickupStatus.ON_THE_WAY, PickupStatus.CANCELLED],
  [PickupStatus.ON_THE_WAY]: [PickupStatus.PICKED_UP, PickupStatus.CANCELLED],
  [PickupStatus.PICKED_UP]: [PickupStatus.DELIVERED],
  [PickupStatus.DELIVERED]: [],
  [PickupStatus.CANCELLED]: [],
};

/** Franjas horarias del paso 2 de "Agendar recolección". */
export enum TimeSlot {
  MORNING_EARLY = '08:00-10:00',
  MORNING_LATE = '10:00-12:00',
  AFTERNOON_EARLY = '14:00-16:00',
  AFTERNOON_LATE = '16:00-18:00',
}

/** "Cantidad aproximada" del paso 1. */
export enum PickupQuantity {
  ONE_BAG = 'ONE_BAG', // 1 bolsa
  TWO_THREE_BAGS = 'TWO_THREE_BAGS', // 2-3 bolsas
  MORE_THAN_THREE = 'MORE_THAN_THREE', // Más de 3
}

/** Tarifa fija por recolección a domicilio (pitch: $10.000). */
export const PICKUP_FEE_COP = 10_000;

// Registro para que GraphQL conozca los enums
registerEnumType(PickupStatus, { name: 'PickupStatus' });
registerEnumType(TimeSlot, { name: 'TimeSlot' });
registerEnumType(PickupQuantity, { name: 'PickupQuantity' });
