import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateWasteCategoryInput,
  UpdateWasteCategoryInput,
} from './dto/waste-category.inputs.js';
import { WasteCategory } from './entities/waste-category.entity.js';

/** 👤 Dueño: Joshua (misma lógica que en el repo REST) */
@Injectable()
export class WasteCategoriesService {
  constructor(
    @InjectRepository(WasteCategory)
    private readonly categoryRepository: Repository<WasteCategory>,
  ) {}

  findAll(): Promise<WasteCategory[]> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  findOne(_term: string): Promise<WasteCategory> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  findByIds(_ids: string[]): Promise<WasteCategory[]> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  create(_input: CreateWasteCategoryInput): Promise<WasteCategory> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  update(
    _id: string,
    _input: UpdateWasteCategoryInput,
  ): Promise<WasteCategory> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  remove(_id: string): Promise<WasteCategory> {
    throw new NotImplementedException('TODO(Joshua)');
  }
}
