import { useGetBusinessQuery } from "@/public/b/[username]/agendar/infrastructure/business.api";

export const useGetBusiness = ({ username }: { username: string }) => {
  const { isPending, error, isError, data, isFetching } = useGetBusinessQuery({
    username,
  });

  return {
    isPending,
    error,
    data,
    isError,
    isFetching,
  };
};
