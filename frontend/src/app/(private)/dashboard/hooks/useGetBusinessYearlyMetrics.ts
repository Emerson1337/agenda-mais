import { useGetBusinessYearlyMetricsQuery } from "../api/business-yearly-metrics.api";

export const useGetBusinessYearlyMetrics = () => {
  const { isPending, error, isError, data, isFetching } =
    useGetBusinessYearlyMetricsQuery();

  return {
    isPending,
    error,
    data,
    isError,
    isFetching,
  };
};
