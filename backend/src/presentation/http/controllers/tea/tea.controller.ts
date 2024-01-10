import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { TeaService } from '@application/use-cases/tea/tea.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { FileAdapter } from '@infra/adapters/fileAdapter/file.adapter';
import { InvalidParamError } from '../../../errors';

@Controller('teas')
export class TeaController {
  constructor(private readonly teaService: TeaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture', new FileAdapter().saveFile()))
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      if (!request.file)
        throw new InvalidParamError(
          'picture',
          "Picture wasn't provided or it's not an image",
        );

      const tea = Object.assign(request.body, {
        picture: request.file.path,
      });

      return response.status(201).send(ok(await this.teaService.create(tea)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get()
  async list(@Res() response: Response) {
    try {
      return response.status(200).send(ok(await this.teaService.list()));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
