import { GraphQLFormattedError } from 'graphql';

/**
 * Manejo de errores (10% del taller).
 *
 * Nest lanza HttpExceptions (NotFoundException, ForbiddenException...) y
 * Apollo las envuelve. Aquí las dejamos SIEMPRE con la misma forma:
 *
 * {
 *   "message": "Recolección no encontrada",
 *   "extensions": { "code": "NOT_FOUND", "statusCode": 404 }
 * }
 *
 * - Errores de validación (class-validator) -> BAD_USER_INPUT + lista de mensajes.
 * - En producción no se filtra el stacktrace.
 */
const STATUS_TO_CODE: Record<number, string> = {
  400: 'BAD_USER_INPUT',
  401: 'UNAUTHENTICATED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  429: 'TOO_MANY_REQUESTS',
  501: 'NOT_IMPLEMENTED',
};

interface OriginalError {
  statusCode?: number;
  message?: string | string[];
}

export function formatGraphQLError(
  formatted: GraphQLFormattedError,
): GraphQLFormattedError {
  const extensions = (formatted.extensions ?? {}) as Record<string, unknown>;
  const original = extensions.originalError as OriginalError | undefined;

  // Errores que vienen de Nest (HttpException)
  if (original?.statusCode) {
    const messages = Array.isArray(original.message)
      ? original.message
      : undefined;
    return {
      message: messages
        ? messages.join('. ')
        : ((original.message as string | undefined) ?? formatted.message),
      path: formatted.path,
      extensions: {
        code: STATUS_TO_CODE[original.statusCode] ?? 'INTERNAL_SERVER_ERROR',
        statusCode: original.statusCode,
        ...(messages ? { validationErrors: messages } : {}),
      },
    };
  }

  // Errores propios de GraphQL (query mal escrita, campo que no existe...)
  const code = (extensions.code as string) ?? 'INTERNAL_SERVER_ERROR';
  const isInternal = code === 'INTERNAL_SERVER_ERROR';
  return {
    message:
      isInternal && process.env.NODE_ENV === 'production'
        ? 'Error interno del servidor'
        : formatted.message,
    locations: formatted.locations,
    path: formatted.path,
    extensions: { code },
  };
}
