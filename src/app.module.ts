import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'node:path';
import { AddressesModule } from './addresses/addresses.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CollectionPointsModule } from './collection-points/collection-points.module.js';
import { formatGraphQLError } from './common/graphql/format-error.js';
import { typeOrmConfigFactory } from './config/database.config.js';
import { validateEnv } from './config/env.validation.js';
import { HealthController } from './health/health.controller.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { PickupsModule } from './pickups/pickups.module.js';
import { RewardsModule } from './rewards/rewards.module.js';
import { SeedModule } from './seed/seed.module.js';
import { UsersModule } from './users/users.module.js';
import { WasteCategoriesModule } from './waste-categories/waste-categories.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      envFilePath:
        process.env.NODE_ENV === 'test' ? ['.env.test', '.env'] : ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),

    // Code-first: el schema se genera desde las clases (@ObjectType, @InputType...)
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // Apollo Sandbox en http://localhost:4100/graphql
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      introspection: true,
      // req en el contexto => los guards pueden leer el header Authorization
      context: ({ req }: { req: unknown }) => ({ req }),
      formatError: formatGraphQLError,
    }),

    AuthModule,
    UsersModule,
    WasteCategoriesModule,
    CollectionPointsModule,
    AddressesModule,
    PickupsModule,
    RewardsModule,
    NotificationsModule,
    SeedModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
