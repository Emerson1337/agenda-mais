import { CoffeeService } from '@application/use-cases/coffee/coffee.service';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { Request, Response } from 'express';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post()
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      const coffee = request.body;

      return response
        .status(201)
        .send(ok(await this.coffeeService.create(coffee)));
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get()
  async list(@Res() response: Response) {
    try {
      return response.status(200).send(ok(await this.coffeeService.list()));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
