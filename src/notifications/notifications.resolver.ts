import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { User } from '../users/entities/user.entity.js';
import { Notification } from './entities/notification.entity.js';
import { NotificationsService } from './notifications.service.js';

/** 👤 Dueña: María José */
@Resolver(() => Notification)
@Auth()
export class NotificationsResolver {
  constructor(private readonly service: NotificationsService) {}

  @Query(() => [Notification])
  myNotifications(@CurrentUser() user: User) {
    return this.service.findMine(user);
  }

  @Query(() => Int)
  unreadNotificationsCount(@CurrentUser() user: User) {
    return this.service.countUnread(user);
  }

  @Mutation(() => Notification)
  markNotificationAsRead(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ) {
    return this.service.markAsRead(id, user);
  }

  @Mutation(() => Int, { description: 'Devuelve cuántas se marcaron' })
  markAllNotificationsAsRead(@CurrentUser() user: User) {
    return this.service.markAllAsRead(user);
  }
}
