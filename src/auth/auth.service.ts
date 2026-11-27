import {
  BadRequestException,
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';
import { AuthResponse, LoginInput, RegisterInput } from './dto/auth.inputs.js';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';

const PG_UNIQUE_VIOLATION = '23505';

/**
 * Misma lógica que el repo REST. Si allá ya está implementado algo,
 * cópienlo tal cual: los services NO dependen de REST ni de GraphQL.
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: RegisterInput): Promise<AuthResponse> {
    const { password, ...data } = input;
    const user = this.userRepository.create({
      ...data,
      password: this.hashPassword(password),
    });
    try {
      await this.userRepository.save(user);
    } catch (error: unknown) {
      if ((error as { code?: string }).code === PG_UNIQUE_VIOLATION) {
        throw new BadRequestException('Ya existe una cuenta con ese correo');
      }
      throw error;
    }
    delete user.password;
    return { user, token: this.signToken(user) };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({
      where: { email: input.email.toLowerCase().trim() },
      select: {
        id: true,
        email: true,
        fullName: true,
        roles: true,
        password: true,
        isActive: true,
        ecoPoints: true,
        twoFactorEnabled: true,
        tokenVersion: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user || !bcrypt.compareSync(input.password, user.password!)) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }
    if (!user.isActive) throw new UnauthorizedException('Usuario inactivo');

    delete user.password;
    return { user, token: this.signToken(user) };
  }

  /** 🚧 TODO(Santiago): incrementar user.tokenVersion (mismo código que en REST). */
  logout(_user: User): Promise<boolean> {
    throw new NotImplementedException('TODO(Santiago): logout');
  }

  hashPassword(plain: string): string {
    return bcrypt.hashSync(plain, 10);
  }

  private signToken(user: User): string {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: user.roles,
      tv: user.tokenVersion ?? 0,
      purpose: 'access',
    };
    return this.jwtService.sign(payload);
  }
}
