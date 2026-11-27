import {
  Field,
  Float,
  ID,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Paginated } from '../../common/interfaces/paginated.interface.js';
import { CollectionPoint } from '../entities/collection-point.entity.js';

const HOUR = /^([01]\d|2[0-3]):[0-5]\d$/;

@InputType()
export class OpeningHourInput {
  @Field(() => Int, { description: '0 = domingo ... 6 = sábado' })
  @IsInt()
  @Min(0)
  @Max(6)
  day: number;

  @Field()
  @Matches(HOUR, { message: 'opens debe tener formato HH:mm' })
  opens: string;

  @Field()
  @Matches(HOUR, { message: 'closes debe tener formato HH:mm' })
  closes: string;
}

@InputType()
export class CreateCollectionPointInput {
  @Field() @IsString() @MinLength(3) name: string;
  @Field({ nullable: true }) @IsOptional() @IsString() description?: string;
  @Field() @IsString() address: string;
  @Field() @IsString() neighborhood: string;
  @Field({ nullable: true }) @IsOptional() @IsString() city?: string;
  @Field(() => Float) @IsLatitude() latitude: number;
  @Field(() => Float) @IsLongitude() longitude: number;
  @Field({ nullable: true }) @IsOptional() @IsString() phone?: string;

  @Field(() => [OpeningHourInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpeningHourInput)
  openingHours: OpeningHourInput[];

  @Field(() => [ID])
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  categoryIds: string[];

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  operatorId?: string;
}

@InputType()
export class UpdateCollectionPointInput extends PartialType(
  CreateCollectionPointInput,
) {}

@InputType()
export class CollectionPointsFilterInput {
  @Field({ nullable: true, description: 'slug de categoría' })
  @IsOptional()
  @IsString()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}

@InputType()
export class NearbyPointsInput {
  @Field(() => Float) @IsLatitude() lat: number;
  @Field(() => Float) @IsLongitude() lng: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  @Field(() => Float, { defaultValue: 5 })
  @IsPositive()
  @Max(50)
  radiusKm: number = 5;

  @Field(() => Int, { defaultValue: 10 })
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 10;
}

@InputType()
export class CreateDropOffInput {
  @Field(() => ID) @IsUUID() pointId: string;
  @Field() @IsEmail() userEmail: string;
  @Field(() => ID) @IsUUID() categoryId: string;
  @Field(() => Float) @IsPositive() quantity: number;
}

@ObjectType()
export class PaginatedCollectionPoints extends Paginated(CollectionPoint) {}
