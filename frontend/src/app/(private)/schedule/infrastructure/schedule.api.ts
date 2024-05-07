import { apiUrls } from "@/lib/apiUrls";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { IScheduleRequest } from "@/shared/types/schedule";

export const usePostScheduleQuery = () =>
  useMutation({
    mutationFn: (data: IScheduleRequest) => {
      return API.post(apiUrls.schedule.create(), data);
    },
  });
