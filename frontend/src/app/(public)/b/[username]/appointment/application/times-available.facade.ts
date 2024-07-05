import { parseISO } from "date-fns";
import { useGetTimesAvailableQuery } from "../infrastructure/times-available.api";

export const useAvailableTimesFacade = ({ username }: { username: string }) => {
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
