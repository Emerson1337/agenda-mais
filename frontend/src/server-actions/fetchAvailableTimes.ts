import { apiUrls } from "@/lib/apiUrls";
import { TimesAvailable } from "@/shared/types/times-available";
import { API } from "../shared/services/config/config";

export const fetchAvailableTimes = async (
  username: string
): Promise<TimesAvailable[]> => {
  return (await API.get(apiUrls.public.availableTimes.get(username))).data.body;
};
