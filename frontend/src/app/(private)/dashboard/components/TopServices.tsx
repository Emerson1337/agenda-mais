import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberUtils } from "@/shared/utils/numberUtils";
import { TrendingUp } from "lucide-react";
import { ServiceRanking } from "@/shared/types/business-yearly-metrics";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function TopServices({
  services,
  emptyState,
}: {
  services: ServiceRanking[];
  emptyState: string;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex gap-3">
          <TrendingUp className="w-4 h-4" />{" "}
          <span>Serviços mais procurados</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {services.length ? (
          services.map((service, index) => (
            <div key={index} className="flex items-center gap-4 flex-wrap">
              <div className="grid gap-1 w-fit">
                <p className="text-sm font-medium leading-none">
                  {service.service}
                </p>
                <p className="text-sm text-muted-foreground">
                  Agendamentos: {service.totalAppointments}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {service.totalValue
                  ? numberUtils.convertToMonetaryBRL(Number(service.totalValue))
                  : 0}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center text-xs justify-start gap-2 h-full text-muted-foreground">
            <InfoCircledIcon className="h-4 w-4" />
            <span>{emptyState}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
