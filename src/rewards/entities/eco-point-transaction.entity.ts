import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, type Relation } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { EcoPointTransactionType } from '../enums/rewards.enums.js';

/** Libro contable de EcoPuntos (historial del perfil). */
@ObjectType()
@Entity('eco_point_transactions')
export class EcoPointTransaction extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: Relation<User>;

  @Field(() => Int)
  @Column('int')
  amount: number;

  @Field(() => EcoPointTransactionType)
  @Column('enum', { enum: EcoPointTransactionType })
  type: EcoPointTransactionType;

  @Field()
  @Column('text')
  description: string;

  @Field(() => ID, { nullable: true })
  @Column('uuid', { nullable: true })
  referenceId?: string | null;
}
