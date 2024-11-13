import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ILoginRequest } from "@/app/(auth)/login/schemas/auth.schema";
import { LoginData } from "@/shared/types/login";
import { signIn } from "@/actions/auth/signIn";
import { AxiosError } from "axios";
import { API } from "@/shared/services/config/config";
import { apiUrls } from "@/lib/apiUrls";

export const useLoginQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginData, AxiosError, ILoginRequest>({
    mutationFn: async (data: ILoginRequest) => {
      const response = await API.post(apiUrls.internal.auth.login(), data);
      signIn(response.data.body);
      return response.data.body;
    },
    onSuccess(_) {
      queryClient.setQueryData<LoginData>(["auth"], (data) => {
        return data;
      });
    },
  });
};
