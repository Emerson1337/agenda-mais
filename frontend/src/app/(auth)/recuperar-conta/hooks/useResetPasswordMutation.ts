import { useResetPasswordQuery } from "../api/reset-password.api";

export const useResetPasswordMutation = () => {
  const { isPending, error, data, mutateAsync, isSuccess } =
    useResetPasswordQuery();

  return {
    mutateAsync,
    isPending,
    error,
    isSuccess,
    data,
  };
};
