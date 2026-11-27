import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationInput } from '../common/dto/pagination.dto.js';
import { IPaginated } from '../common/interfaces/paginated.interface.js';
import {
  CreateUserInput,
  UpdateProfileInput,
  UpdateUserInput,
  UsersFilterInput,
} from './dto/users.inputs.js';
import { User } from './entities/user.entity.js';

/** 👤 Dueño: Santiago */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /** Cualquier usuario autenticado puede ver la lista (enunciado del taller). */
  findAll(
    _filter: UsersFilterInput,
    _pagination: PaginationInput,
  ): Promise<IPaginated<User>> {
    throw new NotImplementedException('TODO(Santiago)');
  }

  async findOneOrFail(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Usuario ${id} no existe`);
    return user;
  }

  /** [admin] Hashear password con AuthService.hashPassword o bcryptjs. */
  create(_input: CreateUserInput): Promise<User> {
    throw new NotImplementedException('TODO(Santiago)');
  }

  /** [admin] No permitir que un admin se quite su propio rol admin. */
  update(_id: string, _input: UpdateUserInput, _actor: User): Promise<User> {
    throw new NotImplementedException('TODO(Santiago)');
  }

  /** [admin] Soft delete: isActive = false. */
  remove(_id: string, _actor: User): Promise<User> {
    throw new NotImplementedException('TODO(Santiago)');
  }

  updateProfile(_user: User, _input: UpdateProfileInput): Promise<User> {
    throw new NotImplementedException('TODO(Santiago)');
  }
}
