import { apiUrls } from "@/lib/apiUrls";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { MeType } from "@/shared/types/me";

export const useGetManagerQuery = () => {
  return useQuery<MeType>({
    queryKey: ["me"],
    queryFn: () =>
      API.get(apiUrls.internal.me.get()).then(
        (response) => response.data.body
      ),
  });
};
