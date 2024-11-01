import { useQuery } from "@tanstack/react-query";
import { BusinessTotalMetric } from "@/shared/types/business-total-metrics";
import { fetchBusinessTotalMetric } from "@/api/fetchBusinessTotalMetric";

export const useGetBusinessGeneralMetricsQuery = () => {
  return useQuery<BusinessTotalMetric | undefined>({
    queryKey: ["total-metrics"],
    queryFn: async () => await fetchBusinessTotalMetric(),
  });
};
