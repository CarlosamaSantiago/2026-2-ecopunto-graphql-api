import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';

/** Tipo de residuo: pilas, electrónicos, aceite usado. */
@ObjectType()
@Entity('waste_categories')
export class WasteCategory extends BaseEntity {
  @Field()
  @Column('text', { unique: true })
  slug: string;

  @Field()
  @Column('text')
  name: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @Column('text')
  deliveryInstructions: string;

  @Field()
  @Column('text')
  icon: string;

  @Field(() => Int)
  @Column('int', { default: 50 })
  pointsReward: number;

  @Field()
  @Column('bool', { default: true })
  isActive: boolean;
}
