"use client";

import { useGetBusinessMonthlyMetrics } from "@/app/(private)/dashboard/hooks/useGetBusinessMonthlyMetrics";
import { format, setDefaultOptions, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PieChartComponent } from "@/components/ui/charts/PieChart";
import { ChartConfig } from "@/components/ui/chart";
import { AreaChartComponent } from "@/components/ui/charts/AreaChart";

setDefaultOptions({ locale: ptBR });

export default function MonthlyCharts() {
  const { data, error, isError, isFetching } = useGetBusinessMonthlyMetrics();

  const beginOfMonth = format(startOfMonth(new Date()), "dd/MM/yyyy");
  const currentDate = format(new Date(), "dd/MM/yyyy");

  // Slice and map to get only the top 5 services for chartData
  const pieChartData = data?.servicesReportByMonth
    .slice(0, 5)
    .map((service) => ({
      label: service.service,
      value: Number(service.totalValue),
      fill: `var(--color-${service.service.replace(/\s/g, "-").toLowerCase()})`,
    }));

  const pieChartConfig = pieChartData?.reduce((config, item, index) => {
    config[item.label.replace(/\s/g, "-").toLowerCase()] = {
      label: item.label,
      color: `hsl(var(--chart-${index + 1}))`, // Dynamically assign a color variable
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
    <div className="sm:flex sm:px-6 w-full">
      <div className="flex flex-wrap sm:flex-nowrap gap-4">
        {!isError && pieChartData && pieChartConfig && (
          <>
            <PieChartComponent
              className="sm:w-1/2 w-full"
              config={pieChartConfig}
              data={pieChartData}
              title={"Top 5 serviços no mês atual"}
              label={`${beginOfMonth} - ${currentDate}`}
              descriptionTitle={"Serviços mais procurados no mês atual."}
              description={
                "Este gráfico mostra os serviços mais procurados no mês atual com número de atendimentos finalizados."
              }
            />
          </>
        )}
        {!isError && areaChartConfig && areaChartData && (
          <>
            <AreaChartComponent
              className="sm:w-1/2 w-full"
              config={areaChartConfig}
              data={areaChartData}
              title={"Atendimentos por horário"}
              label={
                "Analise quais os horários mais procurados pelos clientes."
              }
              descriptionTitle={
                "Acompanhe a disparidade entre atendimentos e valores."
              }
              description={
                "Este gráfico mostra a quantidade de atendimentos por horário e o total em R$."
              }
            />{" "}
          </>
        )}
      </div>
    </div>
  );
}
