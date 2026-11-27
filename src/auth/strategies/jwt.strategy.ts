import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { JwtPayload } from '../interfaces/jwt-payload.interface.js';

/**
 * Se ejecuta en cada request con @Auth(). Lo que retorna validate()
 * queda en request.user (y lo lee @GetUser()).
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    config: ConfigService,
  ) {
    super({
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    if (payload.purpose !== 'access') {
      throw new UnauthorizedException('Token no válido para esta operación');
    }

    const user = await this.userRepository.findOne({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        roles: true,
        isActive: true,
        ecoPoints: true,
        twoFactorEnabled: true,
        tokenVersion: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new UnauthorizedException('Token no válido');
    if (!user.isActive) throw new UnauthorizedException('Usuario inactivo');
    if (user.tokenVersion !== payload.tv) {
      throw new UnauthorizedException('Sesión cerrada. Inicia sesión de nuevo');
    }

    delete user.tokenVersion;
    return user;
  }
}
