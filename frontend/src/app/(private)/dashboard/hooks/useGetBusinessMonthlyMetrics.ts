import { useGetBusinessMonthlyMetricsQuery } from "@/app/(private)/dashboard/api/business-monthly-metrics.api";
import { format } from "date-fns";

export const useGetBusinessMonthlyMetrics = () => {
  const { isPending, error, isError, data, isFetching } =
    useGetBusinessMonthlyMetricsQuery({
      date: format(new Date(), "yyyy-MM-dd"),
    });

  return {
    isPending,
    error,
    data,
    isError,
    isFetching,
  };
};
