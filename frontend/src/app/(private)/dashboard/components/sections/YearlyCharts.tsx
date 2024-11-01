"use client";

import { format, parse, setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChartConfig } from "@/components/ui/chart";
import { useGetBusinessYearlyMetrics } from "@/app/(private)/dashboard/hooks/useGetBusinessYearlyMetrics";
import { MultipleBarChartComponent } from "@/components/ui/charts/MultipleBarChart";

setDefaultOptions({ locale: ptBR });

export default function YearlyCharts() {
  const { data, isError, isFetching } = useGetBusinessYearlyMetrics();

  const barChartData = data?.revenueByMonth.map((service) => {
    const date = parse(service.month, "MM-yyyy", new Date());
    return {
      label: format(date, "MMMM"),
      value: Number(service.totalAppointments),
      alternativeValue: Number(service.totalValue),
    };
  });

  const barChartConfig = barChartData?.reduce((config, item) => {
    config["value"] = {
      label: "Nº atendimentos",
      color: `hsl(var(--chart-1))`,
    };
    config["alternativeValue"] = {
      label: "Total (R$)",
      color: `hsl(var(--chart-4))`,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <div className="sm:flex sm:px-6 w-full">
      {!isError && barChartData && barChartConfig && (
        <>
          <MultipleBarChartComponent
            config={barChartConfig}
            data={barChartData}
            title={`Atendimentos e faturamento por mês`}
            label={"Faturamento do último ano."}
            descriptionTitle={"Analise o faturamento do último ano."}
            description={
              "Aqui você pode analisar o faturamento do último ano e estabelecer metas."
            }
          />{" "}
        </>
      )}
    </div>
  );
}
