import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageMeta {
  @Field(() => Int) total: number;
  @Field(() => Int) page: number;
  @Field(() => Int) limit: number;
  @Field(() => Int) totalPages: number;
}

export interface IPaginated<T> {
  data: T[];
  meta: PageMeta;
}

/**
 * Genera un tipo GraphQL paginado para cualquier entidad:
 *
 *   @ObjectType()
 *   export class PaginatedUsers extends Paginated(User) {}
 *
 * Schema resultante: type PaginatedUsers { data: [User!]!  meta: PageMeta! }
 */
export function Paginated<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginated<T> {
    @Field(() => [classRef])
    data: T[];

    @Field(() => PageMeta)
    meta: PageMeta;
  }
  return PaginatedType;
}

export function paginate<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): IPaginated<T> {
  return {
    data,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) || 1 },
  };
}
