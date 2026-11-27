import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { RewardsModule } from '../rewards/rewards.module.js';
import { UsersModule } from '../users/users.module.js';
import { WasteCategoriesModule } from '../waste-categories/waste-categories.module.js';
import { CollectionPointsResolver } from './collection-points.resolver.js';
import { CollectionPointsService } from './collection-points.service.js';
import { CollectionPoint } from './entities/collection-point.entity.js';
import { DropOff } from './entities/drop-off.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionPoint, DropOff]),
    AuthModule,
    UsersModule,
    WasteCategoriesModule,
    RewardsModule,
  ],
  providers: [CollectionPointsResolver, CollectionPointsService],
  exports: [CollectionPointsService, TypeOrmModule],
})
export class CollectionPointsModule {}
