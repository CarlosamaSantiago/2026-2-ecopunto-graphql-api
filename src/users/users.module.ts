import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { User } from './entities/user.entity.js';
import { UsersResolver } from './users.resolver.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
