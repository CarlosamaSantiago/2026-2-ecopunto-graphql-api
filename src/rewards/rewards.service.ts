import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';
import {
  CreateRewardInput,
  RewardsSummary,
  UpdateRewardInput,
} from './dto/reward.inputs.js';
import { EcoPointsService } from './eco-points.service.js';
import { Redemption } from './entities/redemption.entity.js';
import { Reward } from './entities/reward.entity.js';

/** 👤 Dueña: María José (misma lógica que en el repo REST) */
@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardRepository: Repository<Reward>,
    @InjectRepository(Redemption)
    private readonly redemptionRepository: Repository<Redemption>,
    private readonly ecoPointsService: EcoPointsService,
  ) {}

  findAll(): Promise<Reward[]> {
    throw new NotImplementedException('TODO(María José)');
  }

  create(_input: CreateRewardInput): Promise<Reward> {
    throw new NotImplementedException('TODO(María José)');
  }

  update(_id: string, _input: UpdateRewardInput): Promise<Reward> {
    throw new NotImplementedException('TODO(María José)');
  }

  remove(_id: string): Promise<Reward> {
    throw new NotImplementedException('TODO(María José)');
  }

  redeem(_rewardId: string, _user: User): Promise<Redemption> {
    throw new NotImplementedException('TODO(María José)');
  }

  findMyRedemptions(_user: User): Promise<Redemption[]> {
    throw new NotImplementedException('TODO(María José)');
  }

  getSummary(_user: User): Promise<RewardsSummary> {
    throw new NotImplementedException('TODO(María José)');
  }
}
