import { useLoginQuery } from "../api/login.api";

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
