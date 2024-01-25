import { Controller, Get, Param, Res } from '@nestjs/common';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { AvailableDatesService } from '@src/application/public-routes/available-dates.service';
import { Response } from 'express';

@Controller('/:managerUsername')
export class PublicRoutesController {
  constructor(private readonly availableDatesService: AvailableDatesService) {}

  @Get()
  async create(
    @Param('managerUsername') managerUsername: string,
    @Res() response: Response,
  ) {
    try {
      return response
        .status(201)
        .send(ok(await this.availableDatesService.list(managerUsername)));
    } catch (error) {
      console.log(error);

      return response.status(error.status).send(handleError(error));
    }
  }
}
