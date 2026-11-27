import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, type Relation } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { NotificationType } from '../enums/notification-type.enum.js';

@ObjectType()
@Entity('notifications')
export class Notification extends BaseEntity {
  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: Relation<User>;

  @Field(() => NotificationType)
  @Column('enum', { enum: NotificationType, default: NotificationType.SYSTEM })
  type: NotificationType;

  @Field()
  @Column('text')
  title: string;

  @Field()
  @Column('text')
  body: string;

  @Field()
  @Column('bool', { default: false })
  isRead: boolean;

  /** id relacionado (ej. pickupId) para navegar desde el front. */
  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  referenceId?: string | null;
}
