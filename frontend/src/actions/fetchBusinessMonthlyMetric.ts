import { apiUrls } from "@/lib/apiUrls";
import { API } from "@/shared/services/config/config";
import { BusinessMonthlyMetrics } from "@/shared/types/business-monthly-metrics";

export const fetchBusinessMonthlyMetric = async ({
  date,
}: {
  date: string;
}): Promise<BusinessMonthlyMetrics | undefined> => {
  try {
    return (await API.get(apiUrls.internal.reports.getMonthlyMetrics(date)))
      .data.body;
  } catch (error) {
    console.error("Error fetching business monthly metric data:", error);
    return undefined;
  }
};
