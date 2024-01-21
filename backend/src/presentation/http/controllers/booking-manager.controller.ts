import { BookingManagersService } from '@application/booking-managers/booking-managers.service';
import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { CreateManagerDto } from '@src/application/booking-managers/dtos/create-manager-dto';
import { UpdateManagerDto } from '@src/application/booking-managers/dtos/update-manager-dto';
import { AuthRequired } from '@src/application/shared/decorators/auth-required.decorator';
import { Response } from 'express';

@Controller('dashboard/managers')
export class BookingManagerController {
  constructor(
    private readonly bookingManagersService: BookingManagersService,
  ) {}

  @Post()
  async create(@Body() manager: CreateManagerDto, @Res() response: Response) {
    try {
      return response
        .status(201)
        .send(ok(await this.bookingManagersService.create(manager)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get('me')
  @AuthRequired()
  async listManager(@Req() request: Request, @Res() response: Response) {
    try {
      const userId = request['user'].id;

      return response
        .status(200)
        .send(ok(await this.bookingManagersService.listManager(userId)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Put()
  @AuthRequired()
  async update(
    @Req() request: Request,
    @Body() manager: UpdateManagerDto,
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
