import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../../users/entities/user.entity.js';

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  fullName: string;

  @Field()
  @IsEmail({}, { message: 'El correo no es válido' })
  email: string;

  @Field({
    description: 'Mín. 8 caracteres, una mayúscula, una minúscula y un número',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'La contraseña debe tener al menos una mayúscula, una minúscula y un número',
  })
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: 'El correo no es válido' })
  email: string;

  @Field()
  @IsString()
  @MinLength(1)
  password: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
