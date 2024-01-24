import { Injectable } from '@nestjs/common';
import { InvalidParamError, MultipleErrors } from '@presentation/errors';
import { CreateManagerDto } from '@src/application/booking-managers/dtos/create-manager-dto';
import { BookingManagers } from '@src/domain/entities/booking-managers.entity';
import { ManagersPlansEnum } from '@src/domain/entities/enums/managers-plans.enum';
import { ManagersRolesEnum } from '@src/domain/entities/enums/managers-roles.enum';
import { ManagerStatus } from '@src/domain/entities/enums/managers-status.enum';
import { EncryptAdapter } from '@src/infra/adapters/encrypt.adapter';
import { FileAdapter } from '@src/infra/adapters/file.adapter';

import { BookingManagersRepository } from '../../domain/repositories/booking-managers.repository';
import { UserDto } from '../auth/dtos/user-dto';
import { UpdateManagerAdminDto } from './dtos/update-manager-admin-dto';
import { UpdateManagerDto } from './dtos/update-manager-dto';

@Injectable()
export class BookingManagersService {
  constructor(
    private bookingManagersRepository: BookingManagersRepository,
    private encryptAdapter: EncryptAdapter,
    private fileAdapter: FileAdapter,
  ) {}

  async create(manager: CreateManagerDto): Promise<BookingManagers | Error> {
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
      status: ManagerStatus.PENDING,
      roles: [ManagersRolesEnum.USER],
      plan: ManagersPlansEnum.BASIC,
      password: passwordHashed,
    });
  }

  async update(
    managerId: string,
    manager: UpdateManagerDto,
  ): Promise<BookingManagers | Error> {
    const errors: InvalidParamError[] = [];

    const managerUsernameAlreadyExists =
      await this.bookingManagersRepository.findByUsernameInUse(
        managerId,
        manager.username,
      );

    const managerEmailAlreadyExists =
      await this.bookingManagersRepository.findByEmailInUse(
        managerId,
        manager.email,
      );

    const managerPhoneAlreadyExists =
      await this.bookingManagersRepository.findByPhoneInUse(
        managerId,
        manager.phone,
      );

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

    return await this.bookingManagersRepository.update(managerId, manager);
  }

  async updatePicture(
    managerId: string,
    picturePath: string,
    filename: string,
  ): Promise<BookingManagers | Error> {
    if (!picturePath)
      throw new InvalidParamError(
        'picture',
        "Picture wasn't provided or it's not an image",
      );

    picturePath = await this.fileAdapter.moveFile(
      picturePath,
      `public/${managerId}/${filename}`,
    );

    const manager = await this.bookingManagersRepository.findById(managerId);
    manager.profilePhoto && this.fileAdapter.removeFile(manager.profilePhoto);

    return await this.bookingManagersRepository.updatePicture(
      managerId,
      picturePath,
    );
  }

  async updateManagerAsAdmin(
    managerId: string,
    managerData: UpdateManagerAdminDto,
  ): Promise<BookingManagers | Error> {
    const manager = await this.bookingManagersRepository.findById(managerId);

    if (!manager)
      throw new InvalidParamError('managerId', 'Manager not found.');

    return await this.bookingManagersRepository.updateAsAdmin(managerId, {
      ...manager,
      plan: managerData.plan,
      roles: managerData.roles,
      status: managerData.status,
    });
  }

  async updatePasswordById(managerId: string, password: string) {
    const manager = await this.bookingManagersRepository.findById(managerId);

    if (!manager)
      throw new InvalidParamError('managerId', 'Manager not found.');

    const passwordHashed = await this.encryptAdapter.encryptPassword(password);

    return await this.bookingManagersRepository.updatePasswordById(
      managerId,
      passwordHashed,
    );
  }

  async list(): Promise<Array<BookingManagers> | Error> {
    return (await this.bookingManagersRepository.getAll()).map((manager) =>
      this.removePassword(manager),
    );
  }

  async listManager(id: string): Promise<BookingManagers | Error> {
    return this.removePassword(
      await this.bookingManagersRepository.findById(id),
    );
  }

  async getManagerByEmail(email: string): Promise<BookingManagers> {
    return await this.bookingManagersRepository.findByEmail(email);
  }

  async getManagerById(id: string): Promise<UserDto> {
    return this.removePassword(
      await this.bookingManagersRepository.findById(id),
    );
  }

  private removePassword(manager: BookingManagers) {
    return Object.assign({}, manager, { password: undefined });
  }
}
