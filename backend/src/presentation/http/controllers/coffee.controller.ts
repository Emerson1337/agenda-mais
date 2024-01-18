import { Controller, Get, Res } from '@nestjs/common';
import { CoffeeService } from '@application/use-cases/coffee/coffee.service';
import { Response } from 'express';
import { handleError, ok } from '@presentation/helpers/http.helper';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}
  @Get()
  async list(@Res() response: Response) {
    try {
      return response.status(200).send(ok(await this.coffeeService.list()));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
