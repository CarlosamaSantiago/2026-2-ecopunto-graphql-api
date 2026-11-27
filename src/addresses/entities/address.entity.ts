import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, type Relation } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { User } from '../../users/entities/user.entity.js';

@ObjectType()
@Entity('addresses')
export class Address extends BaseEntity {
  @Field()
  @Column('text')
  label: string;

  @Field()
  @Column('text')
  line: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  neighborhood?: string | null;

  @Field()
  @Column('text', { default: 'Cali' })
  city: string;

  @Field(() => Float, { nullable: true })
  @Column('double precision', { nullable: true })
  latitude?: number | null;

  @Field(() => Float, { nullable: true })
  @Column('double precision', { nullable: true })
  longitude?: number | null;

  @Field()
  @Column('bool', { default: false })
  isDefault: boolean;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  user: Relation<User>;
}
