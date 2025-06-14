"use client";

import { numberUtils } from "@/shared/utils/numberUtils";
import TotalRevenue from "../TotalRevenue";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useGetBusinessYearlyMetrics } from "@/app/(private)/dashboard/hooks/useGetBusinessYearlyMetrics";
import TopServices from "../TopServices";
setDefaultOptions({ locale: ptBR });

export default function YearlyMetrics() {
  const { data, isError, isFetching } = useGetBusinessYearlyMetrics();

  return (
    <div className="flex sm:px-6">
      {!isError && (
        <div className="flex flex-column flex-wrap gap-4 w-full">
          {data?.serviceRanking && (
            <TopServices
              emptyState="Dados insuficientes."
              services={data.serviceRanking}
            />
          )}
          <TotalRevenue
            title={`Receita gerada no último ano`}
            isLoading={isFetching}
            value={numberUtils.convertToMonetaryBRL(Number(data?.totalRevenue))}
            description={`Isso é o quanto você já ganhou com as vendas de seus serviços no último ano.`}
          />
        </div>
      )}
    </div>
  );
}
