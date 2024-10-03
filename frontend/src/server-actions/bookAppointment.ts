import { apiUrls } from "@/lib/apiUrls";
import { API } from "../shared/services/config/config";

export const bookAppointment = async (username: string): Promise<any> => {
  return await API.post(apiUrls.public.appointment.book(username));
};
