import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Paginated } from '../../common/interfaces/paginated.interface.js';
import { Pickup } from '../entities/pickup.entity.js';
import {
  PickupQuantity,
  PickupStatus,
  TimeSlot,
} from '../enums/pickup.enums.js';

@InputType()
export class PickupItemInput {
  @Field(() => ID) @IsUUID() categoryId: string;
  @Field(() => PickupQuantity) @IsEnum(PickupQuantity) quantity: PickupQuantity;
}

@InputType()
export class CreatePickupInput {
  @Field(() => [PickupItemInput])
  @IsArray()
  @ArrayNotEmpty({ message: 'Elige al menos un tipo de residuo' })
  @ValidateNested({ each: true })
  @Type(() => PickupItemInput)
  items: PickupItemInput[];

  @Field({ description: 'YYYY-MM-DD, hoy o futuro' })
  @IsDateString({ strict: true })
  scheduledDate: string;

  @Field(() => TimeSlot) @IsEnum(TimeSlot) timeSlot: TimeSlot;

  @Field(() => ID) @IsUUID() addressId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  notes?: string;
}

/** Modificar MI recolección (solo mientras está SCHEDULED). */
@InputType()
export class UpdatePickupInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString({ strict: true })
  scheduledDate?: string;
  @Field(() => TimeSlot, { nullable: true })
  @IsOptional()
  @IsEnum(TimeSlot)
  timeSlot?: TimeSlot;
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  notes?: string;
}

@InputType()
export class UpdatePickupStatusInput {
  @Field(() => PickupStatus) @IsEnum(PickupStatus) status: PickupStatus;
  @Field({ nullable: true }) @IsOptional() @IsString() note?: string;
}

@InputType()
export class PickupsFilterInput {
  @Field(() => PickupStatus, { nullable: true })
  @IsOptional()
  @IsEnum(PickupStatus)
  status?: PickupStatus;
}

@ObjectType()
export class PaginatedPickups extends Paginated(Pickup) {}
