import { useLoginQuery } from "@/app/(auth)/login/api/login.api";

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
