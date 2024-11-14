import { useResetLinkQuery } from "@/app/(auth)/recuperar-conta/api/reset-password.api";

export const useResetLinkMutation = () => {
  const { isPending, error, data, mutateAsync, isSuccess } =
    useResetLinkQuery();

  return {
    mutateAsync,
    isPending,
    error,
    isSuccess,
    data,
  };
};
