import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';
import { Notification } from './entities/notification.entity.js';
import { NotificationType } from './enums/notification-type.enum.js';

export interface NotifyInput {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  referenceId?: string;
}

/** 👤 Dueña: María José */
@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  notify(_input: NotifyInput, _manager?: EntityManager): Promise<Notification> {
    throw new NotImplementedException('TODO(María José)');
  }

  findMine(_user: User): Promise<Notification[]> {
    throw new NotImplementedException('TODO(María José)');
  }

  countUnread(_user: User): Promise<number> {
    throw new NotImplementedException('TODO(María José)');
  }

  markAsRead(_id: string, _user: User): Promise<Notification> {
    throw new NotImplementedException('TODO(María José)');
  }

  markAllAsRead(_user: User): Promise<number> {
    throw new NotImplementedException('TODO(María José)');
  }
}
