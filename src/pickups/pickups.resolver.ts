import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { PaginationInput } from '../common/dto/pagination.dto.js';
import { User } from '../users/entities/user.entity.js';
import { ValidRoles } from '../users/enums/valid-roles.enum.js';
import {
  CreatePickupInput,
  PaginatedPickups,
  PickupsFilterInput,
  UpdatePickupInput,
  UpdatePickupStatusInput,
} from './dto/pickup.inputs.js';
import { Pickup } from './entities/pickup.entity.js';
import { PickupsService } from './pickups.service.js';

/** 👤 Dueña: María José — "Módulo 1" del enunciado */
@Resolver(() => Pickup)
export class PickupsResolver {
  constructor(private readonly service: PickupsService) {}

  @Mutation(() => Pickup, { description: 'Agendar recolección' })
  @Auth()
  createPickup(
    @Args('input') input: CreatePickupInput,
    @CurrentUser() user: User,
  ) {
    return this.service.create(input, user);
  }

  @Query(() => PaginatedPickups, {
    description: 'citizen: las suyas · operator: asignadas · admin: todas',
  })
  @Auth()
  pickups(
    @CurrentUser() user: User,
    @Args('filter', { nullable: true, defaultValue: {} })
    filter: PickupsFilterInput,
    @Args('pagination', {
      nullable: true,
      defaultValue: { page: 1, limit: 10 },
    })
    pagination: PaginationInput,
  ) {
    return this.service.findAll(filter, pagination, user);
  }

  @Query(() => Pickup)
  @Auth()
  pickup(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ) {
    return this.service.findOne(id, user);
  }

  @Mutation(() => Pickup, { description: 'Modificar (dueño o admin)' })
  @Auth()
  updatePickup(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('input') input: UpdatePickupInput,
    @CurrentUser() user: User,
  ) {
    return this.service.update(id, input, user);
  }

  @Mutation(() => Pickup, { description: 'Eliminar (dueño o admin)' })
  @Auth()
  removePickup(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ) {
    return this.service.remove(id, user);
  }

  @Mutation(() => Pickup, { description: '[operator | admin] Avanzar estado' })
  @Auth(ValidRoles.operator, ValidRoles.admin)
  updatePickupStatus(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('input') input: UpdatePickupStatusInput,
    @CurrentUser() actor: User,
  ) {
    return this.service.updateStatus(id, input, actor);
  }

  @Mutation(() => Pickup, { description: '[admin] Asignar reciclador' })
  @Auth(ValidRoles.admin)
  assignPickupOperator(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('operatorId', { type: () => ID }, ParseUUIDPipe) operatorId: string,
  ) {
    return this.service.assignOperator(id, operatorId);
  }
}
