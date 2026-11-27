import { plainToInstance } from 'class-transformer';
import {
  IsBooleanString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';

/**
 * Variables de entorno que la app necesita para arrancar.
 * Si falta alguna (o tiene un formato inválido) la app NO arranca y muestra
 * qué variable está mal. Así nadie pierde 30 minutos con un "undefined".
 */
class EnvironmentVariables {
  @IsIn(['development', 'test', 'production'])
  NODE_ENV: 'development' | 'test' | 'production' = 'development';

  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number = 4100;

  @IsString()
  DB_HOST: string;

  @IsInt()
  DB_PORT: number;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  /** "true" solo en local. En producción se usa false. */
  @IsOptional()
  @IsBooleanString()
  DB_SYNC?: string;

  /** "true" cuando la BD en la nube exige SSL (Render, Neon, Supabase...). */
  @IsOptional()
  @IsBooleanString()
  DB_SSL?: string;

  @IsString()
  @MinLength(16, { message: 'JWT_SECRET debe tener mínimo 16 caracteres' })
  JWT_SECRET: string;

  @IsOptional()
  @IsString()
  JWT_EXPIRES_IN?: string;

  /** Orígenes permitidos por CORS, separados por coma. */
  @IsOptional()
  @IsString()
  CORS_ORIGINS?: string;

  /** Habilita POST /api/seed. Nunca "true" en producción real. */
  @IsOptional()
  @IsBooleanString()
  SEED_ENABLED?: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, { skipMissingProperties: false });

  if (errors.length > 0) {
    const detail = errors
      .map(
        (e) =>
          `  - ${e.property}: ${Object.values(e.constraints ?? {}).join(', ')}`,
      )
      .join('\n');
    throw new Error(
      `\n❌ Variables de entorno inválidas. Revisa tu .env (copia .env.example):\n${detail}\n`,
    );
  }
  return validated;
}
