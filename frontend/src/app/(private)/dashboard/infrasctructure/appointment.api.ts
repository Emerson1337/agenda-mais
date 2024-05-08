import { apiUrls } from "@/lib/apiUrls";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { Appointment } from "@/shared/types/appointment";
// TODO: WE WILL USE REACT QUERY

export const useGetAppointmentQuery = () => {
  return useQuery<Appointment>({
    queryKey: ["appointment"],
    queryFn: () =>
      API.get(apiUrls.appointment.getAll())
        .then((res: any) => ({
          id: "id fake",
          name: "name fake2",
        }))
        .catch(async (err) => {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          return {
            id: "id fake4",
            name: "name fake4",
          };
        }),
  });
};
