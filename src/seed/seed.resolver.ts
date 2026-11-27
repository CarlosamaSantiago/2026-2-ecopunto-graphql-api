import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service.js';

@Resolver()
export class SeedResolver {
  constructor(
    private readonly seedService: SeedService,
    private readonly config: ConfigService,
  ) {}

  @Mutation(() => String, {
    description:
      '⚠️ Borra la BD y carga datos iniciales (requiere SEED_ENABLED=true)',
  })
  async executeSeed(): Promise<string> {
    if (this.config.get('SEED_ENABLED') !== 'true') {
      throw new ForbiddenException('Seed deshabilitado (SEED_ENABLED != true)');
    }
    const result = await this.seedService.run();
    return `${result.message}. Usuarios: ${result.credentials.map((c) => c.email).join(', ')} (clave ${result.credentials[0].password})`;
  }
}
