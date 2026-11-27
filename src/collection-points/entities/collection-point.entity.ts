import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  type Relation,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { WasteCategory } from '../../waste-categories/entities/waste-category.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { DropOff } from './drop-off.entity.js';

/** Horario de un día. day: 0 = domingo ... 6 = sábado. */
@ObjectType()
export class OpeningHour {
  @Field(() => Int) day: number;
  @Field() opens: string;
  @Field() closes: string;
}

@ObjectType()
@Entity('collection_points')
export class CollectionPoint extends BaseEntity {
  @Field()
  @Column('text')
  name: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  description?: string | null;

  @Field()
  @Column('text')
  address: string;

  @Field()
  @Column('text')
  neighborhood: string;

  @Field()
  @Column('text', { default: 'Cali' })
  city: string;

  @Field(() => Float)
  @Column('double precision')
  latitude: number;

  @Field(() => Float)
  @Column('double precision')
  longitude: number;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  phone?: string | null;

  @Field(() => [OpeningHour])
  @Column('jsonb', { default: [] })
  openingHours: OpeningHour[];

  @Field()
  @Column('bool', { default: false })
  isVerified: boolean;

  @Field()
  @Column('bool', { default: true })
  isActive: boolean;

  @Field(() => [WasteCategory])
  @ManyToMany(() => WasteCategory, { eager: true })
  @JoinTable({ name: 'collection_point_categories' })
  categories: Relation<WasteCategory[]>;

  @ManyToOne(() => User, (user) => user.operatedPoints, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  operator?: Relation<User> | null;

  @OneToMany(() => DropOff, (d) => d.point)
  dropOffs?: Relation<DropOff[]>;
}

/** Resultado del recomendador: punto + distancia + si está abierto. */
@ObjectType()
export class NearbyCollectionPoint {
  @Field(() => CollectionPoint) point: CollectionPoint;
  @Field(() => Float) distanceKm: number;
  @Field() isOpenNow: boolean;
}
