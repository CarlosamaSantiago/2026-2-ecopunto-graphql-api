import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { AddressesResolver } from './addresses.resolver.js';
import { AddressesService } from './addresses.service.js';
import { Address } from './entities/address.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), AuthModule],
  providers: [AddressesResolver, AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
