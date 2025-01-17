"use client";

import { useGetBusinessGeneralMetrics } from "@/app/(private)/dashboard/hooks/useGetBusinessGeneralMetrics";
import { numberUtils } from "@/shared/utils/numberUtils";
import TotalRevenue from "@/app/(private)/dashboard/components/TotalRevenue";
import TotalAppointments from "@/app/(private)/dashboard/components/TotalAppointments";
import { useGetBusinessYearlyMetrics } from "@/app/(private)/dashboard/hooks/useGetBusinessYearlyMetrics";

export default function GeneralMetrics() {
  const { data, isError, isFetching } = useGetBusinessGeneralMetrics();
  const { data: yearlyData, isFetching: yearlyIsFetching } =
    useGetBusinessYearlyMetrics();

  return (
    <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
      {!isError && (
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid *:h-full gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <TotalRevenue
              title={"Receita gerada"}
              isLoading={isFetching}
              value={numberUtils.convertToMonetaryBRL(
                Number(data?.totalRevenueRaised),
              )}
              description={
                "Isso é o quanto você já ganhou com as vendas de seus serviços."
              }
            />
            <TotalAppointments
              title={"Top serviço"}
              isLoading={yearlyIsFetching}
              value={
                yearlyData?.serviceRanking[0]
                  ? String(yearlyData?.serviceRanking[0])
                  : "Nenhum."
              }
              description={"Serviço mais procurado."}
            />
            <TotalAppointments
              title={"Compromissos"}
              isLoading={isFetching}
              value={String(data?.totalAppointmentsToBeDone) ?? "0"}
              description={"Número de agendamentos previstos."}
            />
            <TotalRevenue
              title={"Expectativa de receita"}
              isLoading={isFetching}
              value={numberUtils.convertToMonetaryBRL(
                Number(data?.incomingRevenue),
              )}
              description={"Isso é o quanto você irá ganhar nos próximos dias."}
            />
          </div>
        </div>
      )}
    </main>
  );
}
