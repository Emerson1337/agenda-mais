import { apiUrls } from "@/lib/apiUrls";
import { API } from "@/shared/services/config/config";

export enum AppointmentStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  FINISHED = "FINISHED",
}

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
  date: Date;
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
      }
    )
  ).data.body;
};
