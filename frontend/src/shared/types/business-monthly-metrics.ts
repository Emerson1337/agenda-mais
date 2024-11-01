export interface BusinessMonthlyMetrics {
  servicesReportByMonth: ServicesReportByMonth[];
  totalRevenue: string;
  topTenClients: TopTenClient[];
  reportsByTime: ReportsByTime[];
}

export interface ReportsByTime {
  totalAppointments: number;
  totalValue: string;
  time: string;
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
