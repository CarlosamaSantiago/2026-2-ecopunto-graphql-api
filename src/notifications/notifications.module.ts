import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { Notification } from './entities/notification.entity.js';
import { NotificationsResolver } from './notifications.resolver.js';
import { NotificationsService } from './notifications.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), AuthModule],
  providers: [NotificationsResolver, NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
