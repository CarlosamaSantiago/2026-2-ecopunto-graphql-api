import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PaginationInput } from '../common/dto/pagination.dto.js';
import { IPaginated } from '../common/interfaces/paginated.interface.js';
import { User } from '../users/entities/user.entity.js';
import { EcoPointTransaction } from './entities/eco-point-transaction.entity.js';
import { ECO_LEVELS, EcoPointTransactionType } from './enums/rewards.enums.js';
import { EcoLevel } from './dto/reward.inputs.js';

export interface AwardPointsInput {
  userId: string;
  amount: number;
  type: EcoPointTransactionType;
  description: string;
  referenceId?: string;
}

/** 👤 Dueña: María José — ÚNICO lugar donde se mueven EcoPuntos (ver repo REST). */
@Injectable()
export class EcoPointsService {
  constructor(
    @InjectRepository(EcoPointTransaction)
    private readonly txRepository: Repository<EcoPointTransaction>,
  ) {}

  award(
    _input: AwardPointsInput,
    _manager?: EntityManager,
  ): Promise<EcoPointTransaction> {
    throw new NotImplementedException('TODO(María José)');
  }

  spend(
    _input: AwardPointsInput,
    _manager?: EntityManager,
  ): Promise<EcoPointTransaction> {
    throw new NotImplementedException('TODO(María José)');
  }

  findTransactions(
    _user: User,
    _pagination: PaginationInput,
  ): Promise<IPaginated<EcoPointTransaction>> {
    throw new NotImplementedException('TODO(María José)');
  }

  getLevel(points: number): EcoLevel {
    const index = ECO_LEVELS.findLastIndex((l) => points >= l.minPoints);
    const current = ECO_LEVELS[Math.max(index, 0)];
    const next = ECO_LEVELS[index + 1] ?? null;
    return {
      name: current.name,
      next: next?.name ?? null,
      pointsToNext: next ? next.minPoints - points : 0,
    };
  }
}
