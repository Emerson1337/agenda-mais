"use client";

import { useGetBusinessGeneralMetrics } from "@/app/(private)/dashboard/hooks/useGetBusinessGeneralMetrics";
import TopClients from "@/app/(private)/dashboard/components/TopClients";

export default function GeneralMetricsCards() {
  const { data, isError } = useGetBusinessGeneralMetrics();

  return (
    <div className="flex sm:px-6">
      {!isError && (
        <div className="flex flex-column flex-wrap gap-4 w-full">
          {data?.topTenClients && (
            <TopClients
              title={`Ranking de clientes`}
              emptyState="Dados insuficientes."
              clients={data.topTenClients}
            />
          )}
        </div>
      )}
    </div>
  );
}
