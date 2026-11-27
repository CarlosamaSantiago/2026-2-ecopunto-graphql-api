import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { ValidRoles } from '../users/enums/valid-roles.enum.js';
import {
  CreateWasteCategoryInput,
  UpdateWasteCategoryInput,
} from './dto/waste-category.inputs.js';
import { WasteCategory } from './entities/waste-category.entity.js';
import { WasteCategoriesService } from './waste-categories.service.js';

/** 👤 Dueño: Joshua */
@Resolver(() => WasteCategory)
export class WasteCategoriesResolver {
  constructor(private readonly service: WasteCategoriesService) {}

  @Query(() => [WasteCategory], { description: 'Pilas, electrónicos, aceite' })
  @Auth()
  wasteCategories() {
    return this.service.findAll();
  }

  @Query(() => WasteCategory, { description: 'Por slug o id' })
  @Auth()
  wasteCategory(@Args('term') term: string) {
    return this.service.findOne(term);
  }

  @Mutation(() => WasteCategory)
  @Auth(ValidRoles.admin)
  createWasteCategory(@Args('input') input: CreateWasteCategoryInput) {
    return this.service.create(input);
  }

  @Mutation(() => WasteCategory)
  @Auth(ValidRoles.admin)
  updateWasteCategory(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('input') input: UpdateWasteCategoryInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => WasteCategory, { description: 'Soft delete' })
  @Auth(ValidRoles.admin)
  removeWasteCategory(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.service.remove(id);
  }
}
