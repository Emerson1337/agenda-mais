import { apiUrls } from "@/lib/apiUrls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { ServiceData } from "@/shared/types/service";

export const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return API.delete(apiUrls.internal.service.cancel(id));
    },
    onSuccess(_, variables) {
      queryClient.setQueryData<ServiceData[]>(["services"], (data) => {
        return Array.isArray(data)
          ? data.filter((datum) => datum.id !== variables.id)
          : [];
      });
    },
  });
};

export const useUpdateServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: Partial<ServiceData>;
    }) => {
      return API.put(apiUrls.internal.service.update(id), updatedData);
    },
    onSuccess(response, variables) {
      queryClient.setQueryData<ServiceData[]>(["services"], (data) => {
        return Array.isArray(data)
          ? data.map((datum) =>
              datum.id === variables.id
                ? { ...datum, ...variables.updatedData }
                : datum
            )
          : [];
      });
    },
  });
};

export const useCreateServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newServiceData: Partial<ServiceData>) => {
      return API.post(apiUrls.internal.service.create(), newServiceData);
    },
    onSuccess(response) {
      queryClient.setQueryData<ServiceData[]>(["services"], (data) => {
        const newService = response.data.body;
        return Array.isArray(data) ? [...data, newService] : [newService];
      });
    },
  });
};

export const useGetServiceQuery = () => {
  return useQuery<ServiceData[]>({
    queryKey: ["services"],
    queryFn: () =>
      API.get(apiUrls.internal.service.getAll()).then(
        (response) => response.data.body
      ),
  });
};
