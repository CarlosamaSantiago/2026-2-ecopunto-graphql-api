import { formatGraphQLError } from './format-error.js';

describe('formatGraphQLError', () => {
  it('convierte un NotFoundException de Nest en NOT_FOUND', () => {
    const result = formatGraphQLError({
      message: 'x',
      extensions: {
        originalError: {
          statusCode: 404,
          message: 'Recolección no encontrada',
        },
      },
    });
    expect(result.message).toBe('Recolección no encontrada');
    expect(result.extensions).toMatchObject({
      code: 'NOT_FOUND',
      statusCode: 404,
    });
  });

  it('agrupa los errores de class-validator', () => {
    const result = formatGraphQLError({
      message: 'Bad Request Exception',
      extensions: {
        originalError: {
          statusCode: 400,
          message: ['email inválido', 'password muy corta'],
        },
      },
    });
    expect(result.extensions).toMatchObject({
      code: 'BAD_USER_INPUT',
      validationErrors: ['email inválido', 'password muy corta'],
    });
  });

  it('deja pasar errores de sintaxis GraphQL con su código', () => {
    const result = formatGraphQLError({
      message: 'Cannot query field "foo"',
      extensions: { code: 'GRAPHQL_VALIDATION_FAILED' },
    });
    expect(result.extensions).toEqual({ code: 'GRAPHQL_VALIDATION_FAILED' });
  });
});
