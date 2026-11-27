import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity.js';
import { AuthResolver } from './auth.resolver.js';
import { AuthService } from './auth.service.js';
import { GqlAuthGuard } from './guards/gql-auth.guard.js';
import { UserRoleGuard } from './guards/user-role.guard.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: (config.get<string>('JWT_EXPIRES_IN') ?? '2h') as never,
        },
      }),
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    GqlAuthGuard,
    UserRoleGuard,
  ],
  exports: [AuthService, PassportModule, JwtModule, JwtStrategy],
})
export class AuthModule {}
