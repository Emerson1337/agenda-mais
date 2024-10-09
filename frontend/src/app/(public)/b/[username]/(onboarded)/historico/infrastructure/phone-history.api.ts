import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  AppointmentHistory,
  fetchPhoneHistory,
} from "@/server-actions/fetchPhoneHistory";

export const useGetPhoneHistoryQuery = ({
  username,
  phone,
  limit = 5,
  offset = 0,
}: {
  username: string;
  phone: string;
  limit?: number;
  offset?: number;
}) => {
  return useQuery<AppointmentHistory[], Error>({
    queryKey: ["phoneHistory", phone, username, limit, offset],
    queryFn: () =>
      fetchPhoneHistory({
        username,
        phone,
        limit,
        offset,
      }),
    placeholderData: keepPreviousData, //not working
  });
};
