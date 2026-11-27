import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity.js';
import { AuthService } from './auth.service.js';
import { Auth } from './decorators/auth.decorator.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { AuthResponse, LoginInput, RegisterInput } from './dto/auth.inputs.js';

/** 👤 Dueño: Santiago */
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { description: 'Crear cuenta (rol citizen)' })
  register(@Args('input') input: RegisterInput) {
    return this.authService.register(input);
  }

  @Mutation(() => AuthResponse, { description: 'Iniciar sesión, devuelve JWT' })
  login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }

  @Query(() => User, { description: 'Usuario autenticado' })
  @Auth()
  me(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => Boolean, {
    description: 'Cerrar sesión (invalida los tokens)',
  })
  @Auth()
  logout(@CurrentUser() user: User) {
    return this.authService.logout(user);
  }
}
