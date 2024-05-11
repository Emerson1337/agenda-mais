import { apiUrls } from "@/lib/apiUrls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { IScheduleRequest } from "@/shared/types/schedule";
import { ScheduleData } from "@/private/schedule/domain/schedule.schema";

export const usePostScheduleQuery = () =>
  useMutation({
    mutationFn: (data: IScheduleRequest) => {
      return API.post(apiUrls.schedule.create(), data);
    },
  });

export const useGetScheduleQuery = () => {
  return useQuery<ScheduleData>({
    queryKey: ["schedule"],
    queryFn: () =>
      API.get(apiUrls.schedule.get()).then((response) => response.data.body),
  });
};
