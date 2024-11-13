import { useSignUpQuery } from "../api/signup.api";

export const useSignUpMutation = () => {
  const { isPending, error, data, mutateAsync, isSuccess } = useSignUpQuery();

  return {
    mutateAsync,
    isPending,
    error,
    isSuccess,
    data,
  };
};
