import { Injectable } from '@nestjs/common';
import { ManagerServices } from '@src/domain/entities/manager-services.entity';
import { ManagerServicesRepository } from '@src/domain/repositories/manager-services.repository';
import { InvalidParamError } from '@src/presentation/errors';

import { CreateUpdateManagerServiceDto } from './dtos/create-update-manager-service.dto';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class ManagerServicesService {
  constructor(
    private readonly managerServicesRepository: ManagerServicesRepository,
    private readonly i18n: I18nService,
  ) {}

  async create(
    managerService: CreateUpdateManagerServiceDto,
    managerId: string,
  ): Promise<ManagerServices | Error> {
    const managerWithSameName = await this.managerServicesRepository.findByName(
      managerService.name,
      managerId,
    );

    if (managerWithSameName)
      throw new InvalidParamError(
        'name',
        this.i18n.t('translations.INVALID_FIELD.ALREADY_EXISTS.NAME', {
          lang: I18nContext.current().lang,
        }),
      );

    const managerServiceToSave = { ...managerService, managerId };

    return await this.managerServicesRepository.create(managerServiceToSave);
  }

  async update(
    managerService: CreateUpdateManagerServiceDto,
    {
      managerServiceId,
      managerId,
    }: { managerServiceId: string; managerId: string },
  ): Promise<ManagerServices | Error> {
    const managerWithSameName =
      await this.managerServicesRepository.findByNameInUse(
        managerService.name,
        managerServiceId,
        managerId,
      );

    if (managerWithSameName)
      throw new InvalidParamError(
        'name',
        this.i18n.t('translations.INVALID_FIELD.ALREADY_EXISTS.NAME', {
          lang: I18nContext.current().lang,
        }),
      );

    const managerServiceToSave = { ...managerService, managerId };

    return await this.managerServicesRepository.update(
      managerServiceId,
      managerServiceToSave,
      managerId,
    );
  }

  async delete(
    managerServiceId: string,
    managerId: string,
  ): Promise<void | Error> {
    const managerExists = await this.managerServicesRepository.findById(
      managerServiceId,
      managerId,
    );

    if (!managerExists)
      throw new InvalidParamError(
        'managerServiceId',
        this.i18n.t(
          'translations.INVALID_FIELD.MISSING_DATE.GENERIC_NOT_FOUND',
          {
            lang: I18nContext.current().lang,
          },
        ),
      );

    await this.managerServicesRepository.deleteById(
      managerServiceId,
      managerId,
    );

    return;
  }

  async list(managerId: string): Promise<ManagerServices[] | Error> {
    return await this.managerServicesRepository.getAll(managerId);
  }

  async get(
    managerServiceId: string,
    managerId: string,
  ): Promise<ManagerServices | Error> {
    return await this.managerServicesRepository.findById(
      managerServiceId,
      managerId,
    );
  }
}
