import { apiUrls } from "@/lib/apiUrls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { IScheduleRequest } from "@/shared/types/schedule";
import { ScheduleData } from "@/app/(private)/agenda/schemas/schedule.schema";

export const usePostScheduleQuery = () =>
  useMutation({
    mutationFn: (data: IScheduleRequest) => {
      return API.post(apiUrls.internal.schedule.create(), data);
    },
  });

export const useGetScheduleQuery = () => {
  return useQuery<ScheduleData>({
    queryKey: ["schedule"],
    queryFn: () =>
      API.get(apiUrls.internal.schedule.get()).then(
        (response) => response.data.body
      ),
  });
};
