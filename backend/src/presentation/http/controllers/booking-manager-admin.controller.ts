import { BookingManagersService } from '@application/booking-managers/booking-managers.service';
import { Body, Controller, Get, Param, Patch, Res } from '@nestjs/common';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { UpdateManagerAdminDto } from '@src/application/booking-managers/dtos/update-manager-admin-dto';
import { AuthRequired } from '@src/application/shared/decorators/auth-required.decorator';
import { RolesAllowed } from '@src/application/shared/decorators/auth-roles-required.decorator';
import { ManagersRolesEnum } from '@src/domain/entities/enums/managers-roles.enum';
import { Response } from 'express';

@Controller('admin/managers')
export class BookingManagerAdminController {
  constructor(
    private readonly bookingManagersService: BookingManagersService,
  ) {}

  @Get()
  @AuthRequired()
  @RolesAllowed([ManagersRolesEnum.ADMIN])
  async list(@Res() response: Response) {
    try {
      return response
        .status(200)
        .send(ok(await this.bookingManagersService.list()));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Patch(':managerId')
  @AuthRequired()
  @RolesAllowed([ManagersRolesEnum.ADMIN])
  async update(
    @Param('managerId') managerId: string,
    @Body() manager: UpdateManagerAdminDto,
    @Res() response: Response,
  ) {
    try {
      return response.status(201).send(
        ok(
          await this.bookingManagersService.updateManagerAsAdmin({
            managerId,
            managerData: manager,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
