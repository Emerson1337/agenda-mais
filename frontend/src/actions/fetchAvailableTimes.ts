import { apiUrls } from "@/lib/apiUrls";
import { BusinessSchedule } from "@/shared/types/times-available";
import { API } from "../shared/services/config/config";

export const fetchAvailableTimes = async (
  username: string
): Promise<BusinessSchedule | undefined> => {
  try {
    return (await API.get(apiUrls.public.availableTimes.get(username))).data
      .body;
  } catch (error) {
    console.error("Error fetching business data:", error);
    return undefined;
  }
};
