import { apiUrls } from "@/lib/apiUrls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { MeType } from "@/shared/types/me";
import { IChangePasswordRequest } from "@/app/(private)/detalhes/schemas/change-password.schema";
import { ThemeStrings } from "@/registry/registry-colors";

export const useGetManagerQuery = () => {
  return useQuery<MeType>({
    queryKey: ["me"],
    queryFn: () =>
      API.get(apiUrls.internal.me.get()).then((response) => response.data.body),
  });
};

export interface IRequestUpdateManager {
  welcomeMessage: string;
  username: string;
  firstName: string;
  email: string;
  phone: string;
  appointmentsPerPhone: number;
  palette: ThemeStrings;
}

export const useUpdateManagerQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IRequestUpdateManager) => {
      return API.put(apiUrls.internal.me.put(), data);
    },
    onSuccess() {
      queryClient.setQueryData<MeType>(["me"], (data) => {
        return data;
      });
    },
  });
};

export const useUpdatePhotoAndThemeQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => {
      return API.patch(apiUrls.internal.me.patch(), formData);
    },
    onSuccess() {
      queryClient.setQueryData<MeType>(["me"], (data) => {
        return data;
      });
    },
  });
};

export const useChangePasswordQuery = () => {
  return useMutation({
    mutationFn: (formData: IChangePasswordRequest) => {
      return API.patch(apiUrls.internal.me.changePassword(), formData);
    },
  });
};
