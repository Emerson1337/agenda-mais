import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { AppointmentsService } from '@/application/public-routes/appointments.service';
import { DatesService } from '@/application/public-routes/dates.service';
import { CreateAppointmentDto } from '@/application/public-routes/dtos/create-appointment-dto';
import { Response } from 'express';

@Controller('/:managerUsername')
export class PublicRoutesController {
  constructor(
    private readonly datesService: DatesService,
    private readonly appointmentsService: AppointmentsService,
  ) {}

  @Post('agendamentos')
  async bookAppointment(
    @Param('managerUsername') managerUsername: string,
    @Body() appointmentData: CreateAppointmentDto,
    @Res() response: Response,
  ) {
    try {
      return response.status(201).send(
        ok(
          await this.appointmentsService.bookAppointment({
            username: managerUsername,
            appointmentData,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get()
  async getBusinessData(
    @Param('managerUsername') managerUsername: string,
    @Res() response: Response,
  ) {
    try {
      return response
        .status(201)
        .send(ok(await this.datesService.getBusinessData(managerUsername)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get('horarios')
  async create(
    @Param('managerUsername') managerUsername: string,
    @Res() response: Response,
  ) {
    try {
      return response.status(201).send(
        ok(
          await this.appointmentsService.getSlotsAvailable({
            username: managerUsername,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Delete('cancelar-agendamento/:appointmentCode')
  async cancel(
    @Param('appointmentCode') appointmentCode: string,
    @Param('managerUsername') managerUsername: string,
    @Res() response: Response,
  ) {
    try {
      return response.status(201).send(
        ok(
          await this.appointmentsService.cancel({
            appointmentCode,
            username: managerUsername,
          }),
        ),
      );
    } catch (error) {
      console.log(error);

      return response.status(error.status).send(handleError(error));
    }
  }
}
