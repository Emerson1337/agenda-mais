import { useQuery } from "@tanstack/react-query";
import {
  AppointmentHistory,
  fetchPhoneHistory,
} from "@/server-actions/fetchPhoneHistory";

export const useGetPhoneHistoryQuery = ({
  username,
  phone,
}: {
  username: string;
  phone: string;
}) => {
  return useQuery<AppointmentHistory[]>({
    queryKey: ["phoneHistory", phone],
    queryFn: () =>
      fetchPhoneHistory({
        username,
        phone,
      }), //TODO: check how to handle errors using react query
  });
};
