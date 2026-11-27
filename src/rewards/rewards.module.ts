import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { EcoPointsService } from './eco-points.service.js';
import { EcoPointTransaction } from './entities/eco-point-transaction.entity.js';
import { Redemption } from './entities/redemption.entity.js';
import { Reward } from './entities/reward.entity.js';
import { RewardsResolver } from './rewards.resolver.js';
import { RewardsService } from './rewards.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reward, Redemption, EcoPointTransaction]),
    AuthModule,
  ],
  providers: [RewardsResolver, RewardsService, EcoPointsService],
  exports: [RewardsService, EcoPointsService, TypeOrmModule],
})
export class RewardsModule {}
