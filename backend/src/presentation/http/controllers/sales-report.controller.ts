import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { handleError, ok } from '@presentation/helpers/http.helper';
import { AuthRequired } from '@/application/shared/decorators/auth-required.decorator';
import { Response } from 'express';
import { SalesReportService } from '@application/sales-report/sales-report.service';

@Controller('dashboard/relatorios')
export class SalesReportController {
  constructor(private readonly salesReportService: SalesReportService) {}

  @Get('mensal/:date')
  @AuthRequired()
  async listMonthlyAppointments(
    @Req() request: Request,
    @Res() response: Response,
    @Param('date') date: string,
  ) {
    try {
      const userId = request['user'].id;

      return response.status(200).send(
        ok(
          await this.salesReportService.getMonthlySales({
            managerId: userId,
            date,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get('anual')
  @AuthRequired()
  async listYearlyAppointments(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response.status(200).send(
        ok(
          await this.salesReportService.getYearlySales({
            managerId: userId,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get('total')
  @AuthRequired()
  async listAllAppointments(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const userId = request['user'].id;

      return response.status(200).send(
        ok(
          await this.salesReportService.getAllSales({
            managerId: userId,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }
}
