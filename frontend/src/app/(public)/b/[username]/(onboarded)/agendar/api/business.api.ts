import { useQuery } from "@tanstack/react-query";
import { BusinessFullContext } from "@/shared/types/business";
import { fetchBusinessData } from "@/actions/fetchBusinessData";

export const useGetBusinessQuery = ({ username }: { username: string }) => {
  return useQuery<BusinessFullContext | undefined>({
    queryKey: ["business", username],
    queryFn: async () => await fetchBusinessData(username),
  });
};
