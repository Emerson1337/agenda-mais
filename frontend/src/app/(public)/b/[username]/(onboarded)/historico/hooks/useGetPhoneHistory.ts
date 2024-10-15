import { useGetPhoneHistoryQuery } from "@/app/(public)/b/[username]/(onboarded)/historico/api/phone-history.api";

export const useGetPhoneHistory = ({
  username,
  phone,
  limit,
  offset,
}: {
  username: string;
  phone: string;
  limit?: number;
  offset?: number;
}) => {
  const { isPending, error, isError, data, isFetching } =
    useGetPhoneHistoryQuery({ username, phone, limit, offset });

  return {
    isPending,
    error,
    data,
    isError,
    isFetching,
  };
};
