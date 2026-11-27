import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, type Relation } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { WasteCategory } from '../../waste-categories/entities/waste-category.entity.js';
import { PickupQuantity } from '../enums/pickup.enums.js';
import { Pickup } from './pickup.entity.js';

@ObjectType()
@Entity('pickup_items')
export class PickupItem extends BaseEntity {
  @ManyToOne(() => Pickup, (pickup) => pickup.items, { onDelete: 'CASCADE' })
  pickup: Relation<Pickup>;

  @Field(() => WasteCategory)
  @ManyToOne(() => WasteCategory, { eager: true })
  category: Relation<WasteCategory>;

  @Field(() => PickupQuantity)
  @Column('enum', { enum: PickupQuantity })
  quantity: PickupQuantity;
}
