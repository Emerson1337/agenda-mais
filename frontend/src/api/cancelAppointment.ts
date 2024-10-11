import { apiUrls } from "@/lib/apiUrls";
import { API } from "@/shared/services/config/config";

export type AppointmentCancelled = {
  appointment: Appointment;
  message: string;
};

export type Appointment = {
  managerId: string;
  scheduleId: string;
  serviceId: string;
  time: string;
  clientName: string;
  date: Date;
  code: string;
  notes: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
};

export const cancelAppointment = async ({
  username,
  code,
  phone,
}: {
  username: string;
  code: string;
  phone: string;
}): Promise<AppointmentCancelled> => {
  return (
    await API.delete(apiUrls.public.appointment.cancel({ username, code, phone }))
  ).data.body;
};
