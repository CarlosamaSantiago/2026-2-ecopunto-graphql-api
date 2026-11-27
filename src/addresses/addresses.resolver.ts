import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { User } from '../users/entities/user.entity.js';
import { AddressesService } from './addresses.service.js';
import {
  CreateAddressInput,
  UpdateAddressInput,
} from './dto/address.inputs.js';
import { Address } from './entities/address.entity.js';

/** 👤 Dueño: Joshua */
@Resolver(() => Address)
@Auth()
export class AddressesResolver {
  constructor(private readonly service: AddressesService) {}

  @Query(() => [Address])
  myAddresses(@CurrentUser() user: User) {
    return this.service.findMine(user);
  }

  @Mutation(() => Address)
  createAddress(
    @Args('input') input: CreateAddressInput,
    @CurrentUser() user: User,
  ) {
    return this.service.create(input, user);
  }

  @Mutation(() => Address)
  updateAddress(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('input') input: UpdateAddressInput,
    @CurrentUser() user: User,
  ) {
    return this.service.update(id, input, user);
  }

  @Mutation(() => Address)
  setDefaultAddress(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ) {
    return this.service.setDefault(id, user);
  }

  @Mutation(() => Address)
  removeAddress(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ) {
    return this.service.remove(id, user);
  }
}
