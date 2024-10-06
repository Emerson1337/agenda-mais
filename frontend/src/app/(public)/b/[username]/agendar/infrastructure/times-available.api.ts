import { useQuery } from "@tanstack/react-query";
import { TimesAvailable } from "@/shared/types/times-available";
import { fetchAvailableTimes } from "@/server-actions/fetchAvailableTimes";

export const useGetTimesAvailableQuery = ({
  username,
}: {
  username: string;
}) => {
  return useQuery<TimesAvailable[]>({
    queryKey: ["timesAvailable", username],
    queryFn: async () => await fetchAvailableTimes(username),
  });
};
