import { apiUrls } from "@/lib/apiUrls";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { AppointmentData } from "@/shared/types/appointment";

export const useGetAppointmentQuery = () => {
  return useQuery<AppointmentData>({
    queryKey: ["appointment"],
    queryFn: () =>
      API.get(apiUrls.appointment.getAll()).then(
        (response) => response.data.body
      ),
  });
};
