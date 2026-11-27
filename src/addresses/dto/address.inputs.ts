import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field() @IsString() @MinLength(2) @MaxLength(30) label: string;
  @Field() @IsString() @MinLength(5) line: string;
  @Field({ nullable: true }) @IsOptional() @IsString() neighborhood?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() city?: string;
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsLatitude()
  latitude?: number;
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsLongitude()
  longitude?: number;
  @Field({ nullable: true }) @IsOptional() @IsBoolean() isDefault?: boolean;
}

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {}
