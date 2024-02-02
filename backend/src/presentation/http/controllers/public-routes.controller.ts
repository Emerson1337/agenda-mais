import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { AppointmentsService } from '@src/application/public-routes/appointments.service';
import { AvailableDatesService } from '@src/application/public-routes/available-dates.service';
import { CreateAppointmentDto } from '@src/application/public-routes/dtos/create-appointment-dto';
import { Response } from 'express';

@Controller('/:managerUsername')
export class PublicRoutesController {
  constructor(
    private readonly availableDatesService: AvailableDatesService,
    private readonly appointmentsService: AppointmentsService,
  ) {}

  @Post('appointments')
  async bookAppointment(
    @Param('managerUsername') managerUsername: string,
    @Body() appointmentData: CreateAppointmentDto,
    @Res() response: Response,
  ) {
    try {
      return response
        .status(201)
        .send(
          ok(
            await this.appointmentsService.bookAppointment(
              managerUsername,
              appointmentData,
            ),
          ),
        );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get('')
  async getBusinessData(
    @Param('managerUsername') managerUsername: string,
    @Res() response: Response,
  ) {
    try {
      return response
        .status(201)
        .send(
          ok(await this.availableDatesService.getBusinessData(managerUsername)),
        );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get('times')
  async create(
    @Param('managerUsername') managerUsername: string,
    @Query() query: { date: string },
    @Res() response: Response,
  ) {
    try {
      return response
        .status(201)
        .send(
          ok(await this.availableDatesService.list(managerUsername, query)),
        );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
