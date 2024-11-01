export interface BusinessYearlyMetrics {
  revenueByMonth: RevenueByMonth[];
  totalRevenue: string;
  serviceRanking: ServiceRanking[];
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
