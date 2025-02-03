export interface TopTenClient {
  totalAppointments: number;
  totalValue: string;
  phone: string;
  name: string;
}

export type BusinessTotalMetric = {
  totalRevenueRaised: string;
  totalAppointmentsToBeDone: number;
  incomingRevenue: string;
  topTenClients: TopTenClient[];
};
