import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ISignUpRequest } from "@/app/(auth)/cadastrar/schemas/signup.schema";
import { LoginData } from "@/shared/types/login";
import { AxiosError } from "axios";
import { API } from "@/shared/services/config/config";
import { apiUrls } from "@/lib/apiUrls";

export const useSignUpQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginData, AxiosError, ISignUpRequest>({
    mutationFn: async (data: ISignUpRequest) => {
      return await API.post(apiUrls.internal.auth.signUp(), data);
    },
    onSuccess() {
      queryClient.setQueryData<LoginData>(["auth"], (data) => {
        return data;
      });
    },
  });
};
