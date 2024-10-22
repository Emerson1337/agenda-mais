"use client";

import { useGetManagerQuery } from "../api/manager.api";

export const useGetManager = () => {
  const { isPending, error, data, isFetching } = useGetManagerQuery();

  return {
    isPending,
    error,
    data,
    isFetching,
  };
};
