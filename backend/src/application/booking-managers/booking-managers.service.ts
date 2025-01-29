import { Injectable } from '@nestjs/common';
import { InvalidParamError, MultipleErrors } from '@presentation/errors';
import { CreateManagerDto } from '@/application/booking-managers/dtos/create-manager-dto';
import { BookingManagers } from '@/domain/entities/booking-managers.entity';
import { ManagersPlansEnum } from '@/domain/entities/enums/managers-plans.enum';
import { ManagersRolesEnum } from '@/domain/entities/enums/managers-roles.enum';
import { ManagerStatus } from '@/domain/entities/enums/managers-status.enum';
import { EncryptAdapter } from '@/infra/adapters/encrypt.adapter';
import { FileAdapter } from '@/infra/adapters/file.adapter';

import { BookingManagersRepository } from '@/domain/repositories/booking-managers.repository';
import { UserDto } from '@/application/auth/dtos/user-dto';
import { removeAttributes } from '@/application/shared/utils/objectFormatter';
import { I18nContext, I18nService } from 'nestjs-i18n';
import {
  IUpdate,
  IUpdateManagerAsAdmin,
  IUpdatePasswordById,
  IUpdatePicture,
} from '@/application/booking-managers/dtos/types';
import { ChangePasswordDto } from '@/application/booking-managers/dtos/change-password-dto';
import { defaultProfilePhoto } from '@/application/shared/constants/index';
import { ServerError } from '@/presentation/errors/server-error';

@Injectable()
export class BookingManagersService {
  constructor(
    private bookingManagersRepository: BookingManagersRepository,
    private encryptAdapter: EncryptAdapter,
    private fileAdapter: FileAdapter,
    private readonly i18n: I18nService,
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
        new InvalidParamError(
          'username',
          this.i18n.t('translations.INVALID_FIELD.ALREADY_EXISTS.USERNAME', {
            lang: I18nContext.current().lang,
          }),
        ),
      );

    if (managerEmailAlreadyExists)
      errors.push(
        new InvalidParamError(
          'email',
          this.i18n.t('translations.INVALID_FIELD.ALREADY_EXISTS.EMAIL', {
            lang: I18nContext.current().lang,
          }),
        ),
      );

    if (managerPhoneAlreadyExists)
      errors.push(
        new InvalidParamError(
          'phone',
          this.i18n.t('translations.INVALID_FIELD.ALREADY_EXISTS.PHONE', {
            lang: I18nContext.current().lang,
          }),
        ),
      );

    if (errors.length > 0) {
      throw new MultipleErrors(errors);
    }

    const passwordHashed = await this.encryptAdapter.encryptPassword(
      manager.password,
    );

    return await this.bookingManagersRepository.create({
      ...manager,
      profilePhoto: defaultProfilePhoto,
      status: ManagerStatus.ACTIVE,
      roles: [ManagersRolesEnum.USER],
      plan: ManagersPlansEnum.BASIC,
      password: passwordHashed,
    });
  }

  async update({
    managerId,
    manager,
  }: IUpdate): Promise<BookingManagers | Error> {
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
        new InvalidParamError(
          'username',
          this.i18n.t('translations.INVALID_FIELD.ALREADY_EXISTS.USERNAME', {
            lang: I18nContext.current().lang,
          }),
        ),
      );

    if (managerEmailAlreadyExists)
      errors.push(
        new InvalidParamError(
          'email',
          this.i18n.t('translations.INVALID_FIELD.ALREADY_EXISTS.EMAIL', {
            lang: I18nContext.current().lang,
          }),
        ),
      );

    if (managerPhoneAlreadyExists)
      errors.push(
        new InvalidParamError(
          'phone',
          this.i18n.t('translations.INVALID_FIELD.ALREADY_EXISTS.PHONE', {
            lang: I18nContext.current().lang,
          }),
        ),
      );

    if (errors.length > 0) {
      throw new MultipleErrors(errors);
    }

    return await this.bookingManagersRepository.update(managerId, {
      email: manager.email,
      firstName: manager.firstName,
      lastName: manager.lastName,
      phone: manager.phone,
      profilePhoto: manager.profilePhoto,
      appointmentsPerPhone: manager.appointmentsPerPhone,
      username: manager.username,
      welcomeMessage: manager.welcomeMessage,
      palette: manager.palette,
    });
  }

  async updatePicture({
    picturePath,
    managerId,
    filename,
  }: IUpdatePicture): Promise<BookingManagers | Error> {
    if (!picturePath)
      throw new InvalidParamError(
        'picture',
        this.i18n.t('translations.INVALID_FIELD.MISSING_DATA.PICTURE', {
          lang: I18nContext.current().lang,
        }),
      );

    const { fileUrl } = await this.fileAdapter.uploadFile({
      filePath: picturePath,
      fileName: filename,
      contentType: 'image/jpeg',
    });

    const manager = await this.bookingManagersRepository.findById(managerId);

    if (manager.profilePhoto) {
      try {
        this.fileAdapter.deleteFile(picturePath);
      } catch (error) {
        throw new ServerError(error);
      }
    }

    return await this.bookingManagersRepository.updatePicture(
      managerId,
      fileUrl,
    );
  }

  async updateManagerAsAdmin({
    managerId,
    managerData,
  }: IUpdateManagerAsAdmin): Promise<BookingManagers | Error> {
    const manager = await this.bookingManagersRepository.findById(managerId);

    if (!manager)
      throw new InvalidParamError(
        'managerId',
        this.i18n.t('translations.INVALID_FIELD.MISSING_DATA.MANAGER_ID', {
          lang: I18nContext.current().lang,
        }),
      );

    return await this.bookingManagersRepository.updateAsAdmin(managerId, {
      ...manager,
      plan: managerData.plan,
      roles: managerData.roles,
      status: managerData.status,
    });
  }

  async updatePasswordById({
    managerId,
    password,
  }: IUpdatePasswordById): Promise<BookingManagers> {
    const manager = await this.bookingManagersRepository.findById(managerId);

    if (!manager)
      throw new InvalidParamError(
        'managerId',
        this.i18n.t('translations.INVALID_FIELD.MISSING_DATA.MANAGER_ID', {
          lang: I18nContext.current().lang,
        }),
      );

    const passwordHashed = await this.encryptAdapter.encryptPassword(password);

    return await this.bookingManagersRepository.updatePasswordById(
      managerId,
      passwordHashed,
    );
  }

  async list(): Promise<Array<BookingManagers> | Error> {
    return (await this.bookingManagersRepository.getAll()).map((manager) =>
      removeAttributes<BookingManagers>(manager, ['password']),
    );
  }

  async changePassword(
    id: string,
    changePassword: ChangePasswordDto,
  ): Promise<{ success: boolean; message: string }> {
    const manager = await this.bookingManagersRepository.findById(id);

    const validPassword = await this.encryptAdapter.validatePassword(
      changePassword.password,
      manager.password,
    );

    if (!validPassword) {
      throw new InvalidParamError(
        'password',
        this.i18n.t('translations.MANAGERS.WRONG_PASSWORD', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    await this.bookingManagersRepository.updatePasswordById(
      id,
      await this.encryptAdapter.encryptPassword(changePassword.newPassword),
    );

    return {
      success: true,
      message: this.i18n.t('translations.MANAGERS.PASSWORD_UPDATED', {
        lang: I18nContext.current().lang,
      }),
    };
  }

  async listManager(id: string): Promise<BookingManagers | Error> {
    return removeAttributes<BookingManagers>(
      await this.bookingManagersRepository.findById(id),
      ['password'],
    );
  }

  async getManagerByEmail(email: string): Promise<BookingManagers> {
    return await this.bookingManagersRepository.findByEmail(email);
  }

  async getManagerById(id: string): Promise<UserDto> {
    return removeAttributes<BookingManagers>(
      await this.bookingManagersRepository.findById(id),
      ['password'],
    );
  }
}
