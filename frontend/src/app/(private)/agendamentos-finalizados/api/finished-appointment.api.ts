import { apiUrls } from "@/lib/apiUrls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { FinishedAppointmentData } from "@/shared/types/appointment";
import { UpdateFinishedAppointmentData } from "@/shared/types/appointment";

export const useUpdateFinishedAppointmentQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: UpdateFinishedAppointmentData,
    ): Promise<{
      message: string;
      appointment: FinishedAppointmentData;
    }> => {
      const response = await API.put(
        apiUrls.internal.appointment.updateFinishedAppointment(),
        data,
      );

      return response.data.body;
    },
    onSuccess(updatedAppointment: {
      message: string;
      appointment: FinishedAppointmentData;
    }) {
      queryClient.setQueryData<FinishedAppointmentData[]>(
        ["finishedAppointments"],
        (data) => {
          console.log("🟢🟢🟢🟢 ", data, updatedAppointment.appointment);

          return Array.isArray(data)
            ? data.map((datum) =>
                datum.id === updatedAppointment.appointment.id
                  ? updatedAppointment.appointment
                  : datum,
              )
            : [];
        },
      );
    },
  });
};

export const useGetFinishedAppointmentQuery = () => {
  return useQuery<FinishedAppointmentData[]>({
    queryKey: ["finishedAppointments"],
    queryFn: () =>
      API.get(apiUrls.internal.appointment.getAllFinishedAppointments()).then(
        (response) => response.data.body,
      ),
  });
};
