import { useGetBusinessGeneralMetricsQuery } from "@/app/(private)/dashboard/api/business-general-metrics.api";

export const useGetBusinessGeneralMetrics = () => {
  const { isPending, error, isError, data, isFetching } =
    useGetBusinessGeneralMetricsQuery();

  return {
    isPending,
    error,
    data,
    isError,
    isFetching,
  };
};
