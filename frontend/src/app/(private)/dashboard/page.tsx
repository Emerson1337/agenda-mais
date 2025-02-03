import GeneralMetrics from "./components/sections/GeneralMetrics";
import MonthlyCharts from "./components/sections/MonthlyCharts";
import MonthlyMetrics from "./components/sections/MonthlyMetrics";
import YearlyCharts from "./components/sections/YearlyCharts";
import YearlyMetrics from "./components/sections/YearlyMetrics";
import GeneralMetricsCards from "./components/sections/GeneralMetricsCards";

export default function Dashboard() {
  return (
    <main className="flex flex-wrap lg:flex-nowrap p-4 gap-4">
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <GeneralMetrics />
        <MonthlyCharts />
        <YearlyCharts />
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <GeneralMetricsCards />
        <MonthlyMetrics />
        <YearlyMetrics />
      </div>
    </main>
  );
}
