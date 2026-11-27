import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity.js';

/**
 * Usuario autenticado dentro de un resolver:
 *   myPickups(@CurrentUser() user: User)
 */
export const CurrentUser = createParamDecorator(
  (field: keyof User | undefined, context: ExecutionContext) => {
    const user = GqlExecutionContext.create(context).getContext<{
      req: { user?: User };
    }>().req.user;
    if (!user) {
      throw new InternalServerErrorException(
        'No hay usuario en el contexto. ¿Olvidaste @Auth() en el resolver?',
      );
    }
    return field ? user[field] : user;
  },
);
