import { useQuery } from "@tanstack/react-query";
import { MeType } from "@/shared/types/me";
import { fetchManagerData } from "@/api/fetchManagerData";

export const useGetManagerQuery = () => {
  return useQuery<MeType | undefined>({
    queryKey: ["me"],
    queryFn: async () => await fetchManagerData(),
  });
};
