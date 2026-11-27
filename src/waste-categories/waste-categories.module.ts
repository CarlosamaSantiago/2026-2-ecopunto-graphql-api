import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { WasteCategory } from './entities/waste-category.entity.js';
import { WasteCategoriesResolver } from './waste-categories.resolver.js';
import { WasteCategoriesService } from './waste-categories.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([WasteCategory]), AuthModule],
  providers: [WasteCategoriesResolver, WasteCategoriesService],
  exports: [WasteCategoriesService, TypeOrmModule],
})
export class WasteCategoriesModule {}
