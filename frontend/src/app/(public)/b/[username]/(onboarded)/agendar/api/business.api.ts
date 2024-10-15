import { useQuery } from "@tanstack/react-query";
import { BusinessFullContext } from "@/shared/types/business";
import { fetchBusinessData } from "@/api/fetchBusinessData";

export const useGetBusinessQuery = ({ username }: { username: string }) => {
  return useQuery<BusinessFullContext>({
    queryKey: ["business", username],
    queryFn: async () => await fetchBusinessData(username), //TODO: check how to handle errors using react query
  });
};
