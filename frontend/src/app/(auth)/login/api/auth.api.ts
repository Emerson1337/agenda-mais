import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ILoginRequest } from "@/app/(auth)/login/schemas/auth.schema";
import { LoginData } from "@/shared/types/login";
import { signIn } from "@/actions/auth/signIn";
import { AxiosError } from "axios";

export const useLoginQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginData, AxiosError, ILoginRequest>({
    mutationFn: async (data: ILoginRequest) => {
      return await signIn(data);
    },
    onSuccess(_) {
      queryClient.setQueryData<LoginData>(["auth"], (data) => {
        return data;
      });
    },
  });
};
