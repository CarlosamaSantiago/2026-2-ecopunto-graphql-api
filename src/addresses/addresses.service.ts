import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';
import {
  CreateAddressInput,
  UpdateAddressInput,
} from './dto/address.inputs.js';
import { Address } from './entities/address.entity.js';

/** 👤 Dueño: Joshua (misma lógica que en el repo REST) */
@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  findMine(_user: User): Promise<Address[]> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  findOneOwned(_id: string, _user: User): Promise<Address> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  create(_input: CreateAddressInput, _user: User): Promise<Address> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  update(
    _id: string,
    _input: UpdateAddressInput,
    _user: User,
  ): Promise<Address> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  setDefault(_id: string, _user: User): Promise<Address> {
    throw new NotImplementedException('TODO(Joshua)');
  }

  remove(_id: string, _user: User): Promise<Address> {
    throw new NotImplementedException('TODO(Joshua)');
  }
}
