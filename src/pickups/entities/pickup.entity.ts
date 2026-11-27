import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, type Relation } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { Address } from '../../addresses/entities/address.entity.js';
import {
  PICKUP_FEE_COP,
  PickupStatus,
  TimeSlot,
} from '../enums/pickup.enums.js';
import { PickupItem } from './pickup-item.entity.js';
import { PickupStatusLog } from './pickup-status-log.entity.js';

/**
 * ⭐ Entidad principal ("Módulo 1" del taller GraphQL).
 * Se vincula con el "Módulo 2": items -> WasteCategory, address, statusHistory.
 */
@ObjectType()
@Entity('pickups')
export class Pickup extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.pickups, { onDelete: 'CASCADE' })
  user: Relation<User>;

  @Field(() => Address, { nullable: true })
  @ManyToOne(() => Address, { nullable: true, onDelete: 'SET NULL' })
  address?: Relation<Address> | null;

  @Field()
  @Column('text')
  addressLine: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  operator?: Relation<User> | null;

  @Field({ description: 'YYYY-MM-DD' })
  @Column('date')
  scheduledDate: string;

  @Field(() => TimeSlot)
  @Column('enum', { enum: TimeSlot })
  timeSlot: TimeSlot;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  notes?: string | null;

  @Field(() => Int)
  @Column('int', { default: PICKUP_FEE_COP })
  fee: number;

  @Field(() => PickupStatus)
  @Column('enum', { enum: PickupStatus, default: PickupStatus.SCHEDULED })
  status: PickupStatus;

  @Field(() => Int)
  @Column('int', { default: 0 })
  pointsAwarded: number;

  @Field(() => [PickupItem])
  @OneToMany(() => PickupItem, (item) => item.pickup, {
    cascade: true,
    eager: true,
  })
  items: Relation<PickupItem[]>;

  @Field(() => [PickupStatusLog], { nullable: true })
  @OneToMany(() => PickupStatusLog, (log) => log.pickup, { cascade: true })
  statusHistory?: Relation<PickupStatusLog[]>;
}
