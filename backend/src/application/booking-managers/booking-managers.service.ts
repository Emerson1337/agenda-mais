import { Injectable } from '@nestjs/common';
import { InvalidParamError, MultipleErrors } from '@presentation/errors';
import { CreateUpdateManagerDto } from '@src/application/booking-managers/dtos/create-update-manager-dto';
import { BookingManagersRepository } from '../../domain/repositories/booking-managers.repository';
import { BookingManagers } from '@src/domain/entities/booking-managers.entity';
import { EncryptAdapter } from '@src/infra/adapters/encrypt.adapter';

@Injectable()
export class BookingManagersService {
  constructor(
    private bookingManagersRepository: BookingManagersRepository,
    private encryptAdapter: EncryptAdapter,
  ) {}

  async create(
    manager: CreateUpdateManagerDto,
  ): Promise<BookingManagers | Error> {
    const errors: InvalidParamError[] = [];

    const managerUsernameAlreadyExists =
      await this.bookingManagersRepository.findByUsername(manager.username);

    const managerEmailAlreadyExists =
      await this.bookingManagersRepository.findByEmail(manager.email);

    const managerPhoneAlreadyExists =
      await this.bookingManagersRepository.findByPhone(manager.phone);

    if (managerUsernameAlreadyExists)
      errors.push(
        new InvalidParamError('username', 'This username already exists!'),
      );

    if (managerEmailAlreadyExists)
      errors.push(new InvalidParamError('email', 'This email already exists!'));

    if (managerPhoneAlreadyExists)
      errors.push(new InvalidParamError('phone', 'This phone already exists!'));

    if (errors.length > 0) {
      throw new MultipleErrors(errors);
    }

    const passwordHashed = await this.encryptAdapter.encryptPassword(
      manager.password,
    );

    return await this.bookingManagersRepository.create({
      ...manager,
      password: passwordHashed,
    });
  }

  async update(
    manager: CreateUpdateManagerDto,
  ): Promise<BookingManagers | Error> {
    const errors: InvalidParamError[] = [];

    const managerUsernameAlreadyExists =
      await this.bookingManagersRepository.findByUsername(manager.username);

    const managerEmailAlreadyExists =
      await this.bookingManagersRepository.findByEmail(manager.email);

    const managerPhoneAlreadyExists =
      await this.bookingManagersRepository.findByPhone(manager.phone);

    if (managerUsernameAlreadyExists)
      errors.push(
        new InvalidParamError('username', 'This username already exists!'),
      );

    if (managerEmailAlreadyExists)
      errors.push(new InvalidParamError('email', 'This email already exists!'));

    if (managerPhoneAlreadyExists)
      errors.push(new InvalidParamError('phone', 'This phone already exists!'));

    if (errors.length > 0) {
      throw new MultipleErrors(errors);
    }

    return await this.bookingManagersRepository.create(manager);
  }

  async list(): Promise<Array<BookingManagers> | Error> {
    return await this.bookingManagersRepository.getAll();
  }

  async getManagerByEmail(email: string): Promise<BookingManagers> {
    return await this.bookingManagersRepository.findByEmail(email);
  }

  async getManagerById(id: string): Promise<BookingManagers> {
    return await this.bookingManagersRepository.findById(id);
  }
}
