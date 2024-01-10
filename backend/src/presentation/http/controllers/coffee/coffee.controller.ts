import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CoffeeService } from '@application/use-cases/coffee/coffee.service';
import { Request, Response } from 'express';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { FileInterceptorWithFallback } from '@infra/adapters/fileAdapter/file.adapter';
import { InvalidParamError } from '../../../errors';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Post()
  @UseInterceptors(FileInterceptorWithFallback('picture'))
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      if (!request.file)
        throw new InvalidParamError(
          'picture',
          "Picture wasn't provided or it's not an image",
        );

      const coffee = Object.assign(request.body, {
        picture: request.file.path,
      });

      return response
        .status(201)
        .send(ok(await this.coffeeService.create(coffee)));
    } catch (error) {
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
