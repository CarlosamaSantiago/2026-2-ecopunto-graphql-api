import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';

@ObjectType()
@Entity('rewards')
export class Reward extends BaseEntity {
  @Field()
  @Column('text')
  title: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  description?: string | null;

  @Field(() => Int)
  @Column('int')
  cost: number;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  partner?: string | null;

  @Field()
  @Column('text', { default: 'gift' })
  icon: string;

  @Field(() => Int, { nullable: true, description: 'null = ilimitado' })
  @Column('int', { nullable: true })
  stock?: number | null;

  @Field()
  @Column('bool', { default: true })
  isActive: boolean;
}
