import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationInput } from '../common/dto/pagination.dto.js';
import { IPaginated } from '../common/interfaces/paginated.interface.js';
import { EcoPointsService } from '../rewards/eco-points.service.js';
import { User } from '../users/entities/user.entity.js';
import {
  CollectionPointsFilterInput,
  CreateCollectionPointInput,
  CreateDropOffInput,
  NearbyPointsInput,
  UpdateCollectionPointInput,
} from './dto/collection-point.inputs.js';
import {
  CollectionPoint,
  NearbyCollectionPoint,
} from './entities/collection-point.entity.js';
import { DropOff } from './entities/drop-off.entity.js';

/** 👤 Dueño: Joshua (misma lógica que en el repo REST) */
@Injectable()
export class CollectionPointsService {
  constructor(
    @InjectRepository(CollectionPoint)
    private readonly pointRepository: Repository<CollectionPoint>,
    @InjectRepository(DropOff)
    private readonly dropOffRepository: Repository<DropOff>,
    private readonly ecoPointsService: EcoPointsService,
  ) {}

  findAll(
    _filter: CollectionPointsFilterInput,
    _pagination: PaginationInput,
  ): Promise<IPaginated<CollectionPoint>> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  findNearby(_input: NearbyPointsInput): Promise<NearbyCollectionPoint[]> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  findOne(_id: string): Promise<CollectionPoint> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  create(_input: CreateCollectionPointInput): Promise<CollectionPoint> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  update(
    _id: string,
    _input: UpdateCollectionPointInput,
    _actor: User,
  ): Promise<CollectionPoint> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  setVerified(_id: string, _isVerified: boolean): Promise<CollectionPoint> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  remove(_id: string): Promise<CollectionPoint> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  registerDropOff(_input: CreateDropOffInput, _actor: User): Promise<DropOff> {
    throw new NotImplementedException('TODO(Joshua)');
  }
}
