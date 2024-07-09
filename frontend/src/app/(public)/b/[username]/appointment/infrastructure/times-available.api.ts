import { apiUrls } from "@/lib/apiUrls";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { TimesAvailable } from "@/shared/types/times-available";

export const useGetTimesAvailableQuery = ({
  username,
}: {
  username: string;
}) => {
  return useQuery<TimesAvailable[]>({
    queryKey: ["timesAvailable", username],
    queryFn: () =>
      API.get(apiUrls.public.availableTimes.get(username)).then(
        (response) => response.data.body
      ),
  });
};
