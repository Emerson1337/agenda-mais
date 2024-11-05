"use client";

import { format, parse, setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChartConfig } from "@/components/ui/chart";
import { useGetBusinessYearlyMetrics } from "@/app/(private)/dashboard/hooks/useGetBusinessYearlyMetrics";
import { MultipleBarChartComponent } from "@/components/ui/charts/MultipleBarChart";
import { AreaChartComponent } from "../../../../../components/ui/charts/AreaChart";

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

  const areaChartData = data?.reportsByTime.map((service) => ({
    label: service.time.replace(":", "h"),
    value: Number(service.totalAppointments),
    alternativeValue: Number(service.totalValue),
  }));

  const areaChartConfig = areaChartData?.reduce((config, item) => {
    config["value"] = {
      label: "Nº atendimentos",
      color: `hsl(var(--chart-1))`,
    };
    config["alternativeValue"] = {
      label: "Total (R$)",
      color: `hsl(var(--chart-2))`,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <div className="sm:px-6 flex gap-4">
      {!isError && barChartData && barChartConfig && (
        <MultipleBarChartComponent
          className="sm:w-1/2 w-full"
          config={barChartConfig}
          data={barChartData}
          title={`Atendimentos e faturamento por mês`}
          label={"Faturamento do último ano."}
          descriptionTitle={"Analise o faturamento do último ano."}
          description={
            "Aqui você pode analisar o faturamento do último ano e estabelecer metas."
          }
        />
      )}
      {!isError && areaChartConfig && areaChartData && (
        <AreaChartComponent
          className="sm:w-1/2 w-full"
          config={areaChartConfig}
          data={areaChartData}
          title={"Atendimentos por horário"}
          label={"Analise quais os horários mais procurados pelos clientes."}
          descriptionTitle={
            "Acompanhe a disparidade entre atendimentos e valores."
          }
          description={
            "Este gráfico mostra a quantidade de atendimentos por horário e o total em R$."
          }
        />
      )}
    </div>
  );
}
