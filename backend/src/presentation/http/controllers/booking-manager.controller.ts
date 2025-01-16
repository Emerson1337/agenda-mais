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
import { CreateManagerDto } from '@/application/booking-managers/dtos/create-manager-dto';
import { UploadPictureDto } from '@/application/booking-managers/dtos/upload-picture-manager-dto';
import { AuthRequired } from '@/application/shared/decorators/auth-required.decorator';
import { FileAdapter } from '@/infra/adapters/file.adapter';
import { Response } from 'express';
import { UpdateManagerDto } from '@/application/booking-managers/dtos/update-manager-dto';
import { ChangePasswordDto } from '@/application/booking-managers/dtos/change-password-dto';

@Controller('dashboard/usuarios')
export class BookingManagerController {
  constructor(
    private readonly bookingManagersService: BookingManagersService,
  ) {}

  @Post()
  async create(@Body() manager: CreateManagerDto, @Res() response: Response) {
    try {
      return response
        .status(200)
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

  @Patch('atualizar-senha')
  @AuthRequired()
  async changePassword(
    @Req() request: Request,
    @Body() body: ChangePasswordDto,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response
        .status(200)
        .send(
          ok(await this.bookingManagersService.changePassword(userId, body)),
        );
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

      return response.status(200).send(
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

  @Patch('foto')
  @AuthRequired()
  @UseInterceptors(FileInterceptor('picture', new FileAdapter().saveFile()))
  async updateProfilePhoto(
    @Req() request: Request,
    @Body() _: UploadPictureDto,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response.status(200).send(
        ok(
          await this.bookingManagersService.updatePicture({
            managerId: userId,
            picturePath: request['file'].path as string,
            filename: `${userId}-${request['file'].filename}` as string,
          }),
        ),
      );
    } catch (error) {
      console.log(error);
      return response.status(error.status).send(handleError(error));
    }
  }
}
