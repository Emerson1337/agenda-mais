import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { Response } from 'express';
import { BookingManagersService } from '@application/booking-managers/booking-managers.service';
import { CreateUpdateManagerDto } from '@src/application/booking-managers/dtos/create-update-manager-dto';
import { AuthRequired } from '@src/application/auth/decorators/auth-required.decorator';

@Controller('dashboard/managers')
export class BookingManagerController {
  constructor(
    private readonly bookingManagersService: BookingManagersService,
  ) {}

  @Post()
  async create(
    @Body() manager: CreateUpdateManagerDto,
    @Res() response: Response,
  ) {
    try {
      return response
        .status(201)
        .send(ok(await this.bookingManagersService.create(manager)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get()
  async list(@Res() response: Response) {
    try {
      return response
        .status(200)
        .send(ok(await this.bookingManagersService.list()));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Put()
  @AuthRequired()
  async update(
    @Req() request: Request,
    @Body() manager: CreateUpdateManagerDto,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response
        .status(201)
        .send(ok(await this.bookingManagersService.update(userId, manager)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
