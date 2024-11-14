import { apiUrls } from "@/lib/apiUrls";
import { API } from "@/shared/services/config/config";
import { BusinessTotalMetric } from "@/shared/types/business-total-metrics";

export const fetchBusinessTotalMetric = async (): Promise<
  BusinessTotalMetric | undefined
> => {
  try {
    return (await API.get(apiUrls.internal.reports.getTotalMetrics())).data
      .body;
  } catch (error) {
    console.error("Error fetching business total metric data:", error);
    return undefined;
  }
};
