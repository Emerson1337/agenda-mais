import { apiUrls } from "@/lib/apiUrls";
import { BusinessFullContext } from "@/shared/types/business";
import { API } from "../shared/services/config/config";

export const fetchBusinessData = async (
  username: string
): Promise<BusinessFullContext> => {
  return (await API.get(apiUrls.public.business.get(username))).data.body;
};
