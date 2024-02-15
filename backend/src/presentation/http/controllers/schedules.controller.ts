import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { CreateScheduleDto } from '@src/application/schedules/dtos/create-schedule.dto';
import { DeleteScheduleDto } from '@src/application/schedules/dtos/delete-schedule.dto';
import { SchedulesService } from '@src/application/schedules/schedules.service';
import { AuthRequired } from '@src/application/shared/decorators/auth-required.decorator';
import { Response } from 'express';

@Controller('dashboard/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @AuthRequired()
  async create(
    @Req() request: Request,
    @Body() schedule: CreateScheduleDto,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response.status(201).send(
        ok(
          await this.schedulesService.createOrUpdate({
            ...schedule,
            managerId: userId,
          }),
        ),
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
        .send(ok(await this.schedulesService.list(userId)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Delete()
  @AuthRequired()
  async delete(
    @Req() request: Request,
    @Body() payload: DeleteScheduleDto,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response.status(201).send(
        ok(
          await this.schedulesService.delete({
            schedulesIds: payload.schedulesIds,
            userId,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get('appointments')
  @AuthRequired()
  async listAppointments(@Req() request: Request, @Res() response: Response) {
    try {
      const userId = request['user'].id;

      return response
        .status(201)
        .send(ok(await this.schedulesService.listAppointments(userId)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
