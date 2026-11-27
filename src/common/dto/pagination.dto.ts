import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

/**
 * Argumento estándar de paginación:
 *   users(pagination: { page: 1, limit: 10 }) { ... }
 */
@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @Field(() => Int, { defaultValue: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}

export const skipOf = ({ page, limit }: PaginationInput) => (page - 1) * limit;
