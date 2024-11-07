"use client";

import { numberUtils } from "@/shared/utils/numberUtils";
import TotalRevenue from "../TotalRevenue";
import { useGetBusinessMonthlyMetrics } from "@/app/(private)/dashboard/hooks/useGetBusinessMonthlyMetrics";
import { format, setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import TopClients from "../TopClients";
setDefaultOptions({ locale: ptBR });

export default function MonthlyMetrics() {
  const { data, error, isError, isFetching } = useGetBusinessMonthlyMetrics();

  const currentMonth = format(new Date(), "MMMM");

  return (
    <div className="flex sm:px-6">
      {!isError && (
        <div className="flex flex-column flex-wrap gap-4 w-full">
          {data?.topTenClients && <TopClients clients={data.topTenClients} />}
          <TotalRevenue
            title={`Receita gerada no mês de ${currentMonth}`}
            isLoading={isFetching}
            value={numberUtils.convertToMonetaryBRL(Number(data?.totalRevenue))}
            description={`Isso é o quanto você já ganhou com as vendas de seus serviços no mês de ${currentMonth}.`}
          />
        </div>
      )}
    </div>
  );
}
