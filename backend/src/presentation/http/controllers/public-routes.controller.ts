import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { AvailableDatesService } from '@src/application/public-routes/available-dates.service';
import { Response } from 'express';

@Controller('/:managerUsername')
export class PublicRoutesController {
  constructor(private readonly availableDatesService: AvailableDatesService) {}

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
