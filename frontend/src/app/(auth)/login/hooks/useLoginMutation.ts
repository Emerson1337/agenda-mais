import { useLoginQuery } from "../api/auth.api";

export const useLoginMutation = () => {
  const { isPending, error, data, mutateAsync, isSuccess } = useLoginQuery();

  return {
    mutateAsync,
    isPending,
    error,
    isSuccess,
    data,
  };
};
