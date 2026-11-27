import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

/** GET /health — REST simple para el healthcheck del despliegue. */
@Controller('health')
export class HealthController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get()
  async check() {
    let database: 'up' | 'down' = 'up';
    try {
      await this.dataSource.query('SELECT 1');
    } catch {
      database = 'down';
    }
    return { status: 'ok', database, timestamp: new Date().toISOString() };
  }
}
