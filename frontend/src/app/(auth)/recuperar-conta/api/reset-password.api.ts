import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginData } from "@/shared/types/login";
import { AxiosError } from "axios";
import { API } from "@/shared/services/config/config";
import { apiUrls } from "@/lib/apiUrls";
import { ResetPassword } from "@/shared/types/reset-password";
import {
  IResetLinkRequest,
  IResetPasswordRequest,
} from "@/app/(auth)/recuperar-conta/schemas/reset-password.schema";

export const useResetPasswordQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<ResetPassword, AxiosError, IResetPasswordRequest>({
    mutationFn: async (data: IResetPasswordRequest) => {
      const response = await API.post(
        apiUrls.internal.auth.resetPassword(),
        data
      );
      return response.data.body;
    },
    onSuccess(_) {
      queryClient.setQueryData<LoginData>(["resetPassword"], (data) => {
        return data;
      });
    },
  });
};

export const useResetLinkQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<ResetPassword, AxiosError, IResetLinkRequest>({
    mutationFn: async (data: IResetLinkRequest) => {
      const response = await API.post(
        apiUrls.internal.auth.forgotPassword(),
        data
      );
      return response.data.body;
    },
    onSuccess(_) {
      queryClient.setQueryData<LoginData>(["resetPassword"], (data) => {
        return data;
      });
    },
  });
};
