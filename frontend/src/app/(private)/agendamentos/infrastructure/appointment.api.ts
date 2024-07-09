import { apiUrls } from "@/lib/apiUrls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { AppointmentData } from "@/shared/types/appointment";

interface IRequestCancelAppointment {
  managerId: string,
  appointmentId: string
}

export const useDeleteAppointmentQuery = () =>
  useMutation({
    mutationFn: (data: IRequestCancelAppointment) => {
      return API.delete(
        apiUrls.internal.appointment.cancel(),
        { data }
      );
    },
  });

export const useGetAppointmentQuery = () => {
  return useQuery<AppointmentData[]>({
    queryKey: ["appointment"],
    queryFn: () =>
      API.get(apiUrls.internal.appointment.getAll()).then(
        (response) => response.data.body
      ),
  });
};
