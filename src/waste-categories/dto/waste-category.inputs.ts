import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateWasteCategoryInput {
  @Field({ description: 'minúsculas, sin espacios. Ej: aceite' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'El slug solo admite minúsculas, números y guiones',
  })
  slug: string;

  @Field()
  @IsString()
  @MinLength(3)
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  deliveryInstructions: string;

  @Field()
  @IsString()
  icon: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  pointsReward?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

@InputType()
export class UpdateWasteCategoryInput extends PartialType(
  CreateWasteCategoryInput,
) {}
