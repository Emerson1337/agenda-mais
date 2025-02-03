import { TopTenClient } from "./business-total-metrics";

export interface BusinessMonthlyMetrics {
  servicesReportByMonth: ServicesReportByMonth[];
  totalRevenue: string;
  topTenClients: TopTenClient[];
}

export interface ServicesReportByMonth {
  totalAppointments: number;
  totalValue: string;
  service: string;
  month: string;
}
