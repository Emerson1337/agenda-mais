import { useLoginQuery, useRefreshTokenQuery } from "../api/auth.api";

export const useRefreshTokenMutation = () => {
  const { isPending, error, data, mutateAsync, isSuccess } =
    useRefreshTokenQuery();

  return {
    mutateAsync,
    isPending,
    error,
    isSuccess,
    data,
  };
};
