import { usePostScheduleQuery } from "@/app/(private)/agenda/api/schedule.api";

export const useScheduleMutation = () => {
  const { isPending, error, data, mutate, isSuccess } = usePostScheduleQuery();

  return {
    mutate,
    isPending,
    error,
    isSuccess,
    data,
  };
};
