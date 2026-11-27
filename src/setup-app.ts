import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

/** Configuración global compartida por main.ts y los tests e2e. */
export function setupApp(app: INestApplication) {
  const config = app.get(ConfigService);

  // CSP desactivado: Apollo Sandbox carga scripts externos.
  app.use(
    helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }),
  );
  app.enableCors({
    origin: (config.get<string>('CORS_ORIGINS') ?? 'http://localhost:3000')
      .split(',')
      .map((o) => o.trim()),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  return app;
}
