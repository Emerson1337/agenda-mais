import { apiUrls } from "@/lib/apiUrls";
import { API } from "@/shared/services/config/config";
import { BookAppointmentData } from "@/shared/types/appointment";

export type AppointmentBooked = {
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

export const bookAppointment = async (
  username: string,
  bookAppointmentData: BookAppointmentData
): Promise<AppointmentBooked> => {
  return (
    await API.post(
      apiUrls.public.appointment.book(username),
      bookAppointmentData
    )
  ).data.body;
};
