import { useQuery } from "@tanstack/react-query";
import { BusinessYearlyMetrics } from "@/shared/types/business-yearly-metrics";
import { fetchBusinessYearlyMetric } from "@/actions/fetchBusinessYearlyMetric";

export const useGetBusinessYearlyMetricsQuery = () => {
  return useQuery<BusinessYearlyMetrics | undefined>({
    queryKey: ["yearly-metrics"],
    queryFn: async () => await fetchBusinessYearlyMetric(),
  });
};
