import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { DataSource, EntityManager } from 'typeorm';
import { User } from '../users/entities/user.entity.js';
import { WasteCategory } from '../waste-categories/entities/waste-category.entity.js';
import { SEED_PASSWORD, seedCategories, seedUsers } from './data/seed.data.js';

/**
 * 👤 Dueño: Santiago (cada quien agrega el seed de SUS módulos).
 *
 * Borra TODO y vuelve a cargar los datos iniciales. Idempotente: se puede
 * correr las veces que quieran.
 */
@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async run() {
    await this.dataSource.transaction(async (manager) => {
      await this.truncateAll(manager);
      await this.seedUsers(manager); // retorna User[] (úsenlo para relaciones)
      await this.seedCategories(manager); // retorna WasteCategory[]

      // TODO(Joshua): const categories = ...; await this.seedCollectionPoints(manager, categories, users)
      // TODO(María José): await this.seedRewards(manager) + pickups/notificaciones demo
    });

    this.logger.log('Seed ejecutado ✅');
    return {
      message: 'Seed ejecutado',
      credentials: seedUsers.map((u) => ({
        email: u.email,
        password: SEED_PASSWORD,
        roles: u.roles,
      })),
    };
  }

  private async truncateAll(manager: EntityManager) {
    const tables = this.dataSource.entityMetadatas
      .map((m) => `"${m.tableName}"`)
      .join(', ');
    await manager.query(`TRUNCATE ${tables} RESTART IDENTITY CASCADE`);
  }

  private async seedUsers(manager: EntityManager) {
    const hash = bcrypt.hashSync(SEED_PASSWORD, 10);
    const users = seedUsers.map((u) =>
      manager.create(User, { ...u, password: hash }),
    );
    return manager.save(users);
  }

  private async seedCategories(manager: EntityManager) {
    const categories = seedCategories.map((c) =>
      manager.create(WasteCategory, c),
    );
    return manager.save(categories);
  }
}
