import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { PaginationInput } from '../common/dto/pagination.dto.js';
import {
  CreateUserInput,
  PaginatedUsers,
  UpdateProfileInput,
  UpdateUserInput,
  UsersFilterInput,
} from './dto/users.inputs.js';
import { User } from './entities/user.entity.js';
import { ValidRoles } from './enums/valid-roles.enum.js';
import { UsersService } from './users.service.js';

/** 👤 Dueño: Santiago — "Gestión de usuarios" del enunciado */
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => PaginatedUsers, {
    description: 'Lista de usuarios (cualquier autenticado)',
  })
  @Auth()
  users(
    @Args('filter', { nullable: true, defaultValue: {} })
    filter: UsersFilterInput,
    @Args('pagination', {
      nullable: true,
      defaultValue: { page: 1, limit: 10 },
    })
    pagination: PaginationInput,
  ) {
    return this.usersService.findAll(filter, pagination);
  }

  @Query(() => User)
  @Auth()
  user(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.usersService.findOneOrFail(id);
  }

  @Mutation(() => User, { description: '[admin] Crear usuario' })
  @Auth(ValidRoles.admin)
  createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Mutation(() => User, {
    description: '[admin] Modificar usuario (incluye roles)',
  })
  @Auth(ValidRoles.admin)
  updateUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('input') input: UpdateUserInput,
    @CurrentUser() actor: User,
  ) {
    return this.usersService.update(id, input, actor);
  }

  @Mutation(() => User, {
    description: '[admin] Eliminar (desactivar) usuario',
  })
  @Auth(ValidRoles.admin)
  removeUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() actor: User,
  ) {
    return this.usersService.remove(id, actor);
  }

  @Mutation(() => User, { description: 'Editar mi perfil' })
  @Auth()
  updateProfile(
    @CurrentUser() user: User,
    @Args('input') input: UpdateProfileInput,
  ) {
    return this.usersService.updateProfile(user, input);
  }
}
