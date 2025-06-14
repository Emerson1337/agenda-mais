import { useMutation, useQueryClient } from "@tanstack/react-query";
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
        data,
      );
      return response.data.body;
    },
    onSuccess() {
      queryClient.setQueryData<ResetPassword>(["resetPassword"], (data) => {
        return data;
      });
    },
  });
};

export const useResetLinkQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ResetPassword,
    AxiosError,
    IResetLinkRequest & { recaptchaToken: string }
  >({
    mutationFn: async (
      data: IResetLinkRequest & { recaptchaToken: string },
    ) => {
      const response = await API.post(
        apiUrls.internal.auth.forgotPassword(),
        data,
      );
      return response.data.body;
    },
    onSuccess() {
      queryClient.setQueryData<ResetPassword>(["resetPassword"], (data) => {
        return data;
      });
    },
  });
};
