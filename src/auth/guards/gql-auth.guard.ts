import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * En GraphQL no hay "request" directo: está dentro del contexto de Apollo.
 * Este guard le dice a Passport de dónde sacar la request (y su header Authorization).
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext<{ req: unknown }>()
      .req;
  }
}
