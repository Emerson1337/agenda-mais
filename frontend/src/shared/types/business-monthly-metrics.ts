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

export interface TopTenClient {
  totalAppointments: number;
  totalValue: string;
  phone: string;
  name: string;
}
