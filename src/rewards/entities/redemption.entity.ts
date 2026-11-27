import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, type Relation } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { Reward } from './reward.entity.js';

@ObjectType()
@Entity('redemptions')
export class Redemption extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: Relation<User>;

  @Field(() => Reward)
  @ManyToOne(() => Reward, { eager: true, onDelete: 'CASCADE' })
  reward: Relation<Reward>;

  @Field(() => Int)
  @Column('int')
  cost: number;

  @Field()
  @Column('text', { unique: true })
  code: string;

  @Field(() => Date, { nullable: true })
  @Column('timestamptz', { nullable: true })
  usedAt?: Date | null;
}
