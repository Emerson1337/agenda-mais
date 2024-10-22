import { apiUrls } from "@/lib/apiUrls";
import { BusinessSchedule } from "@/shared/types/times-available";
import { API } from "../shared/services/config/config";
import { MeType } from "../shared/types/me";

export const fetchManagerData = async (): Promise<MeType | undefined> => {
  try {
    return (await API.get(apiUrls.internal.me.get())).data.body;
  } catch (error) {
    console.error("Error fetching manager data:", error);
    return undefined;
  }
};
