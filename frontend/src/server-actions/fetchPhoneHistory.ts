import { apiUrls } from "@/lib/apiUrls";
import { API } from "@/shared/services/config/config";

export interface AppointmentHistory {
  id: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  phone: string;
  timeDuration: string;
  managerId: string;
  date: Date;
  time: string;
  status: string;
}

export const fetchPhoneHistory = async ({
  username,
  phone,
}: {
  phone: string;
  username: string;
}): Promise<AppointmentHistory[]> => {
  return (
    await API.get(
      apiUrls.public.history.get({
        username,
        phone,
      })
    )
  ).data.body;
};
