import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, type Relation } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { PickupStatus } from '../enums/pickup.enums.js';
import { Pickup } from './pickup.entity.js';

@ObjectType()
@Entity('pickup_status_logs')
export class PickupStatusLog extends BaseEntity {
  @ManyToOne(() => Pickup, (pickup) => pickup.statusHistory, {
    onDelete: 'CASCADE',
  })
  pickup: Relation<Pickup>;

  @Field(() => PickupStatus)
  @Column('enum', { enum: PickupStatus })
  status: PickupStatus;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  note?: string | null;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  changedBy?: Relation<User> | null;
}
