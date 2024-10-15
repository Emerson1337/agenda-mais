import { useGetManagerQuery } from "@/private/dashboard/api/manager.api";

export const useGetManager = () => {
  const { isPending, error, isError, data, isFetching } = useGetManagerQuery();

  return {
    isPending,
    error,
    data,
    isError,
    isFetching,
  };
};
