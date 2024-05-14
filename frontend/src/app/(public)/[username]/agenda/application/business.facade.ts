import { useGetBusinessQuery } from "../infrastructure/business.api";

export const useBusinessFacade = ({ username }: { username: string }) => {
  const { isPending, error, data, isFetching } = useGetBusinessQuery({
    username,
  });

  // You can add any additional logic here

  return {
    isPending,
    error,
    data,
    isFetching,
  };
};
