import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressesService } from '../addresses/addresses.service.js';
import { PaginationInput } from '../common/dto/pagination.dto.js';
import { IPaginated } from '../common/interfaces/paginated.interface.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { EcoPointsService } from '../rewards/eco-points.service.js';
import { User } from '../users/entities/user.entity.js';
import { UsersService } from '../users/users.service.js';
import { WasteCategoriesService } from '../waste-categories/waste-categories.service.js';
import {
  CreatePickupInput,
  PickupsFilterInput,
  UpdatePickupInput,
  UpdatePickupStatusInput,
} from './dto/pickup.inputs.js';
import { Pickup } from './entities/pickup.entity.js';
import { PICKUP_TRANSITIONS, PickupStatus } from './enums/pickup.enums.js';

/**
 * 👤 Dueña: María José — entidad principal del taller GraphQL.
 *
 * Reglas del enunciado:
 *  - Usuarios autenticados: CRUD de SUS recolecciones.
 *  - admin: gestiona las de cualquier usuario.
 * + Reglas de negocio iguales al repo REST (ver comentario allá).
 */
@Injectable()
export class PickupsService {
  constructor(
    @InjectRepository(Pickup)
    private readonly pickupRepository: Repository<Pickup>,
    private readonly addressesService: AddressesService,
    private readonly categoriesService: WasteCategoriesService,
    private readonly usersService: UsersService,
    private readonly ecoPointsService: EcoPointsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  create(_input: CreatePickupInput, _user: User): Promise<Pickup> {
    throw new NotImplementedException('TODO(María José)');
  }

  findAll(
    _filter: PickupsFilterInput,
    _pagination: PaginationInput,
    _user: User,
  ): Promise<IPaginated<Pickup>> {
    throw new NotImplementedException('TODO(María José)');
  }

  findOne(_id: string, _user: User): Promise<Pickup> {
    throw new NotImplementedException('TODO(María José)');
  }

  update(_id: string, _input: UpdatePickupInput, _user: User): Promise<Pickup> {
    throw new NotImplementedException('TODO(María José)');
  }

  /** Dueño: solo si SCHEDULED o CANCELLED. Admin: siempre. Devuelve la eliminada. */
  remove(_id: string, _user: User): Promise<Pickup> {
    throw new NotImplementedException('TODO(María José)');
  }

  updateStatus(
    _id: string,
    _input: UpdatePickupStatusInput,
    _actor: User,
  ): Promise<Pickup> {
    throw new NotImplementedException('TODO(María José)');
  }

  assignOperator(_id: string, _operatorId: string): Promise<Pickup> {
    throw new NotImplementedException('TODO(María José)');
  }

  canTransition(from: PickupStatus, to: PickupStatus): boolean {
    return PICKUP_TRANSITIONS[from].includes(to);
  }
}
