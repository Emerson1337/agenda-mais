import { apiUrls } from "@/lib/apiUrls";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/shared/services/config/config";
import { BusinessType } from "@/shared/types/business";

export const useGetBusinessQuery = ({ username }: { username: string }) => {
  return useQuery<BusinessType>({
    queryKey: ["business", username],
    queryFn: () =>
      API.get(apiUrls.business.get(username)).then(
        (response) => response.data.body
      ),
  });
};
