"use client";

import { useGetBusinessGeneralMetrics } from "@/app/(private)/dashboard/hooks/useGetBusinessGeneralMetrics";
import { numberUtils } from "@/shared/utils/numberUtils";
import TotalRevenue from "../TotalRevenue";
import TotalAppointments from "../TotalAppointments";

export default function GeneralMetrics() {
  const { data, isError, isFetching } = useGetBusinessGeneralMetrics();

  return (
    <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
      {!isError && (
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <TotalRevenue
              title={"Receita gerada"}
              isLoading={isFetching}
              value={numberUtils.convertToMonetaryBRL(
                Number(data?.totalRevenueRaised)
              )}
              description={
                "Isso é o quanto você já ganhou com as vendas de seus serviços."
              }
            />
            <TotalAppointments
              title={"Agendamentos em aberto"}
              isLoading={isFetching}
              value={String(data?.totalAppointmentsToBeDone) ?? "0"}
              description={
                "Número de agendamentos previstos para os próximos dias."
              }
            />
            <div className="xl:col-span-1 col-span-full">
              <TotalRevenue
                title={"Expectativa de receita"}
                isLoading={isFetching}
                value={numberUtils.convertToMonetaryBRL(
                  Number(data?.incomingRevenue)
                )}
                description={
                  "Isso é o quanto você irá ganhar nos próximos dias."
                }
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
