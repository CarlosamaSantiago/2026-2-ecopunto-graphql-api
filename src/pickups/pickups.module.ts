import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesModule } from '../addresses/addresses.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { RewardsModule } from '../rewards/rewards.module.js';
import { UsersModule } from '../users/users.module.js';
import { WasteCategoriesModule } from '../waste-categories/waste-categories.module.js';
import { PickupItem } from './entities/pickup-item.entity.js';
import { PickupStatusLog } from './entities/pickup-status-log.entity.js';
import { Pickup } from './entities/pickup.entity.js';
import { PickupsResolver } from './pickups.resolver.js';
import { PickupsService } from './pickups.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pickup, PickupItem, PickupStatusLog]),
    AuthModule,
    UsersModule,
    AddressesModule,
    WasteCategoriesModule,
    RewardsModule,
    NotificationsModule,
  ],
  providers: [PickupsResolver, PickupsService],
  exports: [PickupsService],
})
export class PickupsModule {}
