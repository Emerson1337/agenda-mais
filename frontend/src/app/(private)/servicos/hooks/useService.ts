"use client";

import { useGetServiceQuery } from "@/app/(private)/servicos/api/service.api";

export const useService = () => {
  const { isPending, error, data, isFetching } = useGetServiceQuery();

  return {
    isPending,
    error,
    data,
    isFetching,
  };
};
