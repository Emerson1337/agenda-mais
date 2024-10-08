import { useGetPhoneHistoryQuery } from "@/app/(public)/b/[username]/historico/infrastructure/phone-history.api";

export const useGetPhoneHistory = ({
  username,
  phone,
}: {
  username: string;
  phone: string;
}) => {
  const { isPending, error, isError, data, isFetching } =
    useGetPhoneHistoryQuery({ username, phone });

  return {
    isPending,
    error,
    data,
    isError,
    isFetching,
  };
};
