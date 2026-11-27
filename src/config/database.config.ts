import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Configuración de TypeORM leída del .env.
 * - autoLoadEntities: cada módulo registra sus entidades con TypeOrmModule.forFeature().
 * - synchronize: crea/ajusta tablas automáticamente. Útil en local, peligroso en prod.
 */
export const typeOrmConfigFactory = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get<string>('DB_HOST'),
  port: Number(config.get('DB_PORT')),
  database: config.get<string>('DB_NAME'),
  username: config.get<string>('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD'),
  autoLoadEntities: true,
  synchronize: config.get('DB_SYNC') === 'true',
  ssl: config.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
});
