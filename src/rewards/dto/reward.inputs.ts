import {
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Paginated } from '../../common/interfaces/paginated.interface.js';
import { EcoPointTransaction } from '../entities/eco-point-transaction.entity.js';

@InputType()
export class CreateRewardInput {
  @Field() @IsString() @MinLength(3) title: string;
  @Field({ nullable: true }) @IsOptional() @IsString() description?: string;
  @Field(() => Int) @IsInt() @IsPositive() cost: number;
  @Field({ nullable: true }) @IsOptional() @IsString() partner?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() icon?: string;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;
  @Field({ nullable: true }) @IsOptional() @IsBoolean() isActive?: boolean;
}

@InputType()
export class UpdateRewardInput extends PartialType(CreateRewardInput) {}

@ObjectType()
export class EcoLevel {
  @Field() name: string;
  @Field(() => String, { nullable: true }) next: string | null;
  @Field(() => Int) pointsToNext: number;
}

@ObjectType()
export class ImpactStats {
  @Field(() => Int) batteries: number;
  @Field(() => Float) oilLiters: number;
  @Field(() => Int) electronics: number;
  @Field(() => Float) waterProtectedLiters: number;
}

@ObjectType()
export class ProfileStats {
  @Field(() => Int) pickups: number;
  @Field(() => Int) pointsVisited: number;
  @Field(() => Int) coupons: number;
}

/** Pantalla "Mis recompensas". */
@ObjectType()
export class RewardsSummary {
  @Field(() => Int) ecoPoints: number;
  @Field(() => EcoLevel) level: EcoLevel;
  @Field(() => ImpactStats) impact: ImpactStats;
  @Field(() => ProfileStats) stats: ProfileStats;
}

@ObjectType()
export class PaginatedEcoPointTransactions extends Paginated(
  EcoPointTransaction,
) {}
