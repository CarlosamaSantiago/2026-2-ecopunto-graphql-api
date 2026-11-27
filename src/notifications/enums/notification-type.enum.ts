import { registerEnumType } from '@nestjs/graphql';
export enum NotificationType {
  PICKUP_STATUS = 'PICKUP_STATUS', // "Tu reciclador va en camino"
  POINTS = 'POINTS', // "Ganaste +50 EcoPuntos"
  REWARD = 'REWARD', // "Canjeaste tu cupón"
  SYSTEM = 'SYSTEM',
}

// Registro para que GraphQL conozca los enums
registerEnumType(NotificationType, { name: 'NotificationType' });
