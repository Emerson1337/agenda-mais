import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { CreateUpdateManagerServiceDto } from '@src/application/manager-services/dtos/create-update-manager-service.dto';
import { ManagerServicesService } from '@src/application/manager-services/manager-services.service';
import { AuthRequired } from '@src/application/shared/decorators/auth-required.decorator';
import { Response } from 'express';

@Controller('dashboard/servicos')
export class ManagerServicesController {
  constructor(
    private readonly managerServicesService: ManagerServicesService,
  ) {}

  @Post()
  @AuthRequired()
  async create(
    @Req() request: Request,
    @Body() managerService: CreateUpdateManagerServiceDto,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response
        .status(201)
        .send(
          ok(await this.managerServicesService.create(managerService, userId)),
        );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get(':managerServiceId')
  @AuthRequired()
  async get(
    @Req() request: Request,
    @Param('managerServiceId') managerServiceId: string,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response
        .status(201)
        .send(
          ok(await this.managerServicesService.get(managerServiceId, userId)),
        );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get()
  @AuthRequired()
  async list(@Req() request: Request, @Res() response: Response) {
    try {
      const userId = request['user'].id;

      return response
        .status(201)
        .send(ok(await this.managerServicesService.list(userId)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Put(':managerServiceId')
  @AuthRequired()
  async update(
    @Req() request: Request,
    @Body() managerService: CreateUpdateManagerServiceDto,
    @Param('managerServiceId') managerServiceId: string,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response.status(201).send(
        ok(
          await this.managerServicesService.update(managerService, {
            managerServiceId,
            managerId: userId,
          }),
        ),
      );
    } catch (error) {
      console.log(error);

      return response.status(error.status).send(handleError(error));
    }
  }

  @Delete(':managerServiceId')
  @AuthRequired()
  async delete(
    @Req() request: Request,
    @Param('managerServiceId') managerServiceId: string,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response
        .status(201)
        .send(
          ok(
            await this.managerServicesService.delete(managerServiceId, userId),
          ),
        );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
