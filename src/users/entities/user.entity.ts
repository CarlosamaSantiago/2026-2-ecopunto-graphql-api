import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  type Relation,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { ValidRoles } from '../enums/valid-roles.enum.js';
import { Address } from '../../addresses/entities/address.entity.js';
import { Pickup } from '../../pickups/entities/pickup.entity.js';
import { CollectionPoint } from '../../collection-points/entities/collection-point.entity.js';
import { Notification } from '../../notifications/entities/notification.entity.js';

/**
 * Una sola clase = tabla (TypeORM) + tipo GraphQL (@ObjectType).
 * Campos SIN @Field() (password, twoFactorSecret, tokenVersion) NO existen en
 * el schema: es imposible pedirlos desde una query.
 */
@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field()
  @Column('text')
  fullName: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password?: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  phone?: string | null;

  @Field(() => [ValidRoles])
  @Column('text', { array: true, default: [ValidRoles.citizen] })
  roles: ValidRoles[];

  @Field()
  @Column('bool', { default: true })
  isActive: boolean;

  @Field(() => Int)
  @Column('int', { default: 0 })
  ecoPoints: number;

  @Field()
  @Column('bool', { default: false })
  twoFactorEnabled: boolean;

  @Column('text', { nullable: true, select: false })
  twoFactorSecret?: string | null;

  /** Se incrementa en cada logout para invalidar los tokens anteriores. */
  @Column('int', { default: 0, select: false })
  tokenVersion?: number;

  // Relaciones: se exponen con @ResolveField en los resolvers (no aquí),
  // para cargarlas solo cuando la query las pide.
  @OneToMany(() => Address, (address) => address.user)
  addresses?: Relation<Address[]>;

  @OneToMany(() => Pickup, (pickup) => pickup.user)
  pickups?: Relation<Pickup[]>;

  @OneToMany(() => CollectionPoint, (point) => point.operator)
  operatedPoints?: Relation<CollectionPoint[]>;

  @OneToMany(() => Notification, (n) => n.user)
  notifications?: Relation<Notification[]>;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail() {
    if (this.email) this.email = this.email.toLowerCase().trim();
  }
}
