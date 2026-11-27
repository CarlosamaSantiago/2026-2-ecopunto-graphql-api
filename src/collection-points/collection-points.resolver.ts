import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { PaginationInput } from '../common/dto/pagination.dto.js';
import { User } from '../users/entities/user.entity.js';
import { ValidRoles } from '../users/enums/valid-roles.enum.js';
import { CollectionPointsService } from './collection-points.service.js';
import {
  CollectionPointsFilterInput,
  CreateCollectionPointInput,
  CreateDropOffInput,
  NearbyPointsInput,
  PaginatedCollectionPoints,
  UpdateCollectionPointInput,
} from './dto/collection-point.inputs.js';
import {
  CollectionPoint,
  NearbyCollectionPoint,
} from './entities/collection-point.entity.js';
import { DropOff } from './entities/drop-off.entity.js';

/** 👤 Dueño: Joshua */
@Resolver(() => CollectionPoint)
export class CollectionPointsResolver {
  constructor(private readonly service: CollectionPointsService) {}

  @Query(() => PaginatedCollectionPoints)
  @Auth()
  collectionPoints(
    @Args('filter', { nullable: true, defaultValue: {} })
    filter: CollectionPointsFilterInput,
    @Args('pagination', {
      nullable: true,
      defaultValue: { page: 1, limit: 10 },
    })
    pagination: PaginationInput,
  ) {
    return this.service.findAll(filter, pagination);
  }

  @Query(() => [NearbyCollectionPoint], { description: 'El recomendador' })
  @Auth()
  nearbyCollectionPoints(@Args('input') input: NearbyPointsInput) {
    return this.service.findNearby(input);
  }

  @Query(() => CollectionPoint)
  @Auth()
  collectionPoint(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => CollectionPoint)
  @Auth(ValidRoles.admin)
  createCollectionPoint(@Args('input') input: CreateCollectionPointInput) {
    return this.service.create(input);
  }

  @Mutation(() => CollectionPoint, { description: '[admin | operator dueño]' })
  @Auth(ValidRoles.admin, ValidRoles.operator)
  updateCollectionPoint(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('input') input: UpdateCollectionPointInput,
    @CurrentUser() actor: User,
  ) {
    return this.service.update(id, input, actor);
  }

  @Mutation(() => CollectionPoint, {
    description: '[admin] Sello de verificado',
  })
  @Auth(ValidRoles.admin)
  setCollectionPointVerified(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('isVerified') isVerified: boolean,
  ) {
    return this.service.setVerified(id, isVerified);
  }

  @Mutation(() => CollectionPoint, { description: 'Soft delete' })
  @Auth(ValidRoles.admin)
  removeCollectionPoint(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.service.remove(id);
  }

  @Mutation(() => DropOff, {
    description: '[operator | admin] Registrar entrega en punto',
  })
  @Auth(ValidRoles.admin, ValidRoles.operator)
  registerDropOff(
    @Args('input') input: CreateDropOffInput,
    @CurrentUser() actor: User,
  ) {
    return this.service.registerDropOff(input, actor);
  }
}
