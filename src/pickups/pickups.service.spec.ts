import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressesService } from '../addresses/addresses.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { EcoPointsService } from '../rewards/eco-points.service.js';
import { UsersService } from '../users/users.service.js';
import { WasteCategoriesService } from '../waste-categories/waste-categories.service.js';
import { Pickup } from './entities/pickup.entity.js';
import { PickupStatus } from './enums/pickup.enums.js';
import { PickupsService } from './pickups.service.js';

/**
 * Plantilla de prueba unitaria con TestingModule: cada dependencia se
 * reemplaza por un objeto con vi.fn(). Copien este patrón en sus servicios.
 */
describe('PickupsService', () => {
  let service: PickupsService;
  const pickupRepository = {
    create: vi.fn(),
    save: vi.fn(),
    findOne: vi.fn(),
    findAndCount: vi.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PickupsService,
        { provide: getRepositoryToken(Pickup), useValue: pickupRepository },
        { provide: AddressesService, useValue: { findOneOwned: vi.fn() } },
        { provide: WasteCategoriesService, useValue: { findByIds: vi.fn() } },
        { provide: UsersService, useValue: { findOneOrFail: vi.fn() } },
        { provide: EcoPointsService, useValue: { award: vi.fn() } },
        { provide: NotificationsService, useValue: { notify: vi.fn() } },
      ],
    }).compile();

    service = moduleRef.get(PickupsService);
  });

  it('se crea', () => {
    expect(service).toBeDefined();
  });

  describe('canTransition', () => {
    it('permite SCHEDULED -> ON_THE_WAY', () => {
      expect(
        service.canTransition(PickupStatus.SCHEDULED, PickupStatus.ON_THE_WAY),
      ).toBe(true);
    });

    it('NO permite DELIVERED -> SCHEDULED', () => {
      expect(
        service.canTransition(PickupStatus.DELIVERED, PickupStatus.SCHEDULED),
      ).toBe(false);
    });

    it('NO permite cancelar algo ya recogido', () => {
      expect(
        service.canTransition(PickupStatus.PICKED_UP, PickupStatus.CANCELLED),
      ).toBe(false);
    });
  });
});
