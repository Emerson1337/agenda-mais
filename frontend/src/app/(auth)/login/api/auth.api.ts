import { apiUrls } from "@/lib/apiUrls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import {
  ILoginRequest,
  IRefreshTokenRequest,
} from "@/app/(auth)/login/schemas/auth.schema";
import { LoginData, RefreshToken } from "@/shared/types/login";

export const useLoginQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginData, Error, ILoginRequest>({
    mutationFn: async (data: ILoginRequest) => {
      return (await API.post(apiUrls.internal.auth.login(), data)).data.body;
    },
    onSuccess(_) {
      queryClient.setQueryData<LoginData>(["auth"], (data) => {
        return data;
      });
    },
  });
};

export const useRefreshTokenQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<RefreshToken, Error, IRefreshTokenRequest>({
    mutationFn: async (data: IRefreshTokenRequest) => {
      return (await API.post(apiUrls.internal.auth.refreshToken(), data)).data
        .body;
    },
    onSuccess(_) {
      queryClient.setQueryData<LoginData>(["auth"], (data) => {
        return data;
      });
    },
  });
};
