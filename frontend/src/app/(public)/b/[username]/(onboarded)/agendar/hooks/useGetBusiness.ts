import { useGetBusinessQuery } from "../api/business.api";

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
