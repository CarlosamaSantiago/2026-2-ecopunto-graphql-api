import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { PaginationInput } from '../common/dto/pagination.dto.js';
import { User } from '../users/entities/user.entity.js';
import { ValidRoles } from '../users/enums/valid-roles.enum.js';
import {
  CreateRewardInput,
  PaginatedEcoPointTransactions,
  RewardsSummary,
  UpdateRewardInput,
} from './dto/reward.inputs.js';
import { EcoPointsService } from './eco-points.service.js';
import { Redemption } from './entities/redemption.entity.js';
import { Reward } from './entities/reward.entity.js';
import { RewardsService } from './rewards.service.js';

/** 👤 Dueña: María José */
@Resolver(() => Reward)
export class RewardsResolver {
  constructor(
    private readonly rewardsService: RewardsService,
    private readonly ecoPointsService: EcoPointsService,
  ) {}

  @Query(() => [Reward], { description: 'Catálogo de cupones' })
  @Auth()
  rewards() {
    return this.rewardsService.findAll();
  }

  @Query(() => RewardsSummary, {
    description: 'Mis EcoPuntos, nivel e impacto',
  })
  @Auth()
  myRewardsSummary(@CurrentUser() user: User) {
    return this.rewardsService.getSummary(user);
  }

  @Query(() => PaginatedEcoPointTransactions, {
    description: 'Historial de EcoPuntos',
  })
  @Auth()
  myPointTransactions(
    @CurrentUser() user: User,
    @Args('pagination', {
      nullable: true,
      defaultValue: { page: 1, limit: 10 },
    })
    pagination: PaginationInput,
  ) {
    return this.ecoPointsService.findTransactions(user, pagination);
  }

  @Query(() => [Redemption])
  @Auth()
  myRedemptions(@CurrentUser() user: User) {
    return this.rewardsService.findMyRedemptions(user);
  }

  @Mutation(() => Redemption, { description: 'Canjear cupón' })
  @Auth()
  redeemReward(
    @Args('rewardId', { type: () => ID }, ParseUUIDPipe) rewardId: string,
    @CurrentUser() user: User,
  ) {
    return this.rewardsService.redeem(rewardId, user);
  }

  @Mutation(() => Reward)
  @Auth(ValidRoles.admin)
  createReward(@Args('input') input: CreateRewardInput) {
    return this.rewardsService.create(input);
  }

  @Mutation(() => Reward)
  @Auth(ValidRoles.admin)
  updateReward(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('input') input: UpdateRewardInput,
  ) {
    return this.rewardsService.update(id, input);
  }

  @Mutation(() => Reward, { description: 'Soft delete' })
  @Auth(ValidRoles.admin)
  removeReward(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.rewardsService.remove(id);
  }
}
