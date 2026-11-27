import { Module } from '@nestjs/common';
import { SeedResolver } from './seed.resolver.js';
import { SeedService } from './seed.service.js';

@Module({
  providers: [SeedResolver, SeedService],
})
export class SeedModule {}
