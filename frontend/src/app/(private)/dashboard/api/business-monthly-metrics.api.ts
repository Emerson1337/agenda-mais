import { useQuery } from "@tanstack/react-query";
import { BusinessMonthlyMetrics } from "@/shared/types/business-monthly-metrics";
import { fetchBusinessMonthlyMetric } from "@/api/fetchBusinessMonthlyMetric";

export const useGetBusinessMonthlyMetricsQuery = ({
  date,
}: {
  date: string;
}) => {
  return useQuery<BusinessMonthlyMetrics | undefined>({
    queryKey: ["monthly-metrics"],
    queryFn: async () => await fetchBusinessMonthlyMetric({ date }),
  });
};
