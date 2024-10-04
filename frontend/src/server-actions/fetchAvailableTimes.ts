import { apiUrls } from "@/lib/apiUrls";
import { BusinessSchedule } from "@/shared/types/times-available";
import { API } from "../shared/services/config/config";

export const fetchAvailableTimes = async (
  username: string
): Promise<BusinessSchedule> => {
  return (await API.get(apiUrls.public.availableTimes.get(username))).data.body;
};
