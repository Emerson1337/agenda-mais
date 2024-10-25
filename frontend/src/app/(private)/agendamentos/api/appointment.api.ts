import { apiUrls } from "@/lib/apiUrls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { AppointmentData } from "@/shared/types/appointment";

interface IRequestCancelAppointment {
  managerId: string;
  appointmentId: string;
}

export const useDeleteAppointmentQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IRequestCancelAppointment) => {
      return API.delete(apiUrls.internal.appointment.cancel(), { data });
    },
    onSuccess(_, variables) {
      queryClient.setQueryData<AppointmentData[]>(["appointments"], (data) => {
        return Array.isArray(data)
          ? data.filter((datum) => datum._id !== variables.appointmentId)
          : [];
      });
    },
  });
};

export const useGetAppointmentQuery = () => {
  return useQuery<AppointmentData[]>({
    queryKey: ["appointments"],
    queryFn: () =>
      API.get(apiUrls.internal.appointment.getAll()).then(
        (response) => response.data.body
      ),
  });
};
