import { apiUrls } from "@/lib/apiUrls";
import { API } from "@/shared/services/config/config";
import { BusinessYearlyMetrics } from "@/shared/types/business-yearly-metrics";

export const fetchBusinessYearlyMetric = async (): Promise<
  BusinessYearlyMetrics | undefined
> => {
  try {
    return (await API.get(apiUrls.internal.reports.getYearlyMetrics())).data
      .body;
  } catch (error) {
    console.error("Error fetching yearly metrics data:", error);
    return undefined;
  }
};
