import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { setupApp } from './setup-app.js';

async function bootstrap() {
  const app = setupApp(await NestFactory.create(AppModule));
  const port = process.env.PORT ?? 4100;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🌱 GraphQL: http://localhost:${port}/graphql (Apollo Sandbox)`);
  logger.log(`❤️  Health:  http://localhost:${port}/health`);
}
await bootstrap();
