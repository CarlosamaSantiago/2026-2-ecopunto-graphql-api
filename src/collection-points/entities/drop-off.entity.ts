import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, type Relation } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { WasteCategory } from '../../waste-categories/entities/waste-category.entity.js';
import { CollectionPoint } from './collection-point.entity.js';

/** Entrega en punto registrada por el operador. */
@ObjectType()
@Entity('drop_offs')
export class DropOff extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: Relation<User>;

  @Field(() => CollectionPoint)
  @ManyToOne(() => CollectionPoint, (p) => p.dropOffs, { onDelete: 'CASCADE' })
  point: Relation<CollectionPoint>;

  @Field(() => WasteCategory)
  @ManyToOne(() => WasteCategory, { eager: true })
  category: Relation<WasteCategory>;

  @Field(() => Float)
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => Number(v) },
  })
  quantity: number;

  @Field(() => Int)
  @Column('int', { default: 0 })
  pointsAwarded: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  registeredBy?: Relation<User> | null;
}
