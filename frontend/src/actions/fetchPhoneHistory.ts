import { apiUrls } from "@/lib/apiUrls";
import { API } from "@/shared/services/config/config";
import { AppointmentStatus } from "@/shared/types/appointment";

export interface AppointmentHistory {
  id: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  phone: string;
  timeDurationInMinutes: number;
  serviceName: string;
  notes: string;
  managerId: string;
  code: string;
  clientName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

export const fetchPhoneHistory = async ({
  username,
  phone,
  limit,
  offset,
}: {
  phone: string;
  username: string;
  limit?: number;
  offset?: number;
}): Promise<AppointmentHistory[]> => {
  return (
    await API.get(
      apiUrls.public.history.get({
        username,
        phone,
      }),
      {
        params: {
          limit,
          offset,
        },
      },
    )
  ).data.body;
};
