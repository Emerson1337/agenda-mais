import { BookingManagersService } from '@application/booking-managers/booking-managers.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { CreateManagerDto } from '@src/application/booking-managers/dtos/create-manager-dto';
import { UpdateManagerDto } from '@src/application/booking-managers/dtos/update-manager-dto';
import { UploadPictureDto } from '@src/application/booking-managers/dtos/upload-picture-manager-dto';
import { AuthRequired } from '@src/application/shared/decorators/auth-required.decorator';
import { FileAdapter } from '@src/infra/adapters/file.adapter';
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

      return response.status(201).send(
        ok(
          await this.bookingManagersService.update({
            managerId: userId,
            manager,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Patch('picture')
  @AuthRequired()
  @UseInterceptors(FileInterceptor('picture', new FileAdapter().saveFile()))
  async updateProfilePhoto(
    @Req() request: Request,
    @Body() _: UploadPictureDto,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response.status(201).send(
        ok(
          await this.bookingManagersService.updatePicture({
            managerId: userId,
            picturePath: request['file'].path as string,
            filename: request['file'].filename as string,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
