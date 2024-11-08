import { apiUrls } from "@/lib/apiUrls";
import { BusinessFullContext } from "@/shared/types/business";
import { API } from "../shared/services/config/config";

export const fetchBusinessData = async (
  username: string
): Promise<BusinessFullContext | undefined> => {
  try {
    const response = await API.get(apiUrls.public.business.get(username));
    return response.data.body;
  } catch (error) {
    console.error("Error fetching business data:", error);
    return undefined;
  }
};
