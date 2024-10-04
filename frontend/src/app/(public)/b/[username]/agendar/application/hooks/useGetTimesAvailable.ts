import { parseISO } from "date-fns";
import { useGetTimesAvailableQuery } from "@/public/b/[username]/agendar/infrastructure/times-available.api";

export const useGetTimesAvailable = ({ username }: { username: string }) => {
  const { isPending, error, isError, data, isFetching } =
    useGetTimesAvailableQuery({
      username,
    });

  const datesAvailable = data?.map((slot) => parseISO(slot.date));

  return {
    isPending,
    error,
    data,
    datesAvailable,
    isError,
    isFetching,
  };
};
