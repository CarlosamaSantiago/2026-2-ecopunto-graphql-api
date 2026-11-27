import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Paginated } from '../../common/interfaces/paginated.interface.js';
import { User } from '../entities/user.entity.js';
import { ValidRoles } from '../enums/valid-roles.enum.js';

@InputType()
export class UsersFilterInput {
  @Field(() => ValidRoles, { nullable: true })
  @IsOptional()
  @IsEnum(ValidRoles)
  role?: ValidRoles;

  @Field({ nullable: true, description: 'Busca por nombre o correo' })
  @IsOptional()
  @IsString()
  search?: string;
}

/** El superadmin (admin) crea usuarios con el rol que quiera. */
@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  fullName: string;

  @Field()
  @IsEmail({}, { message: 'El correo no es válido' })
  email: string;

  @Field()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'La contraseña debe tener al menos una mayúscula, una minúscula y un número',
  })
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field(() => [ValidRoles], { defaultValue: [ValidRoles.citizen] })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ValidRoles, { each: true })
  roles: ValidRoles[];
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}

/** Lo que el propio usuario puede cambiar de su perfil. */
@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  fullName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;
}

@ObjectType()
export class PaginatedUsers extends Paginated(User) {}
