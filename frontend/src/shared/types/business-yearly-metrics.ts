export interface BusinessYearlyMetrics {
  revenueByMonth: RevenueByMonth[];
  totalRevenue: string;
  serviceRanking: ServiceRanking[];
  reportsByTime: ReportsByTime[];
}

export interface ReportsByTime {
  totalAppointments: number;
  totalValue: string;
  time: string;
}

export interface RevenueByMonth {
  totalAppointments: number;
  totalValue: string;
  month: string;
}

export interface ServiceRanking {
  totalAppointments: number;
  totalValue: string;
  service: string;
}
