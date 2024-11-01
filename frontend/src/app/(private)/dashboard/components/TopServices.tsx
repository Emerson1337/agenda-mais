import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberUtils } from "@/shared/utils/numberUtils";
import { TrendingUp } from "lucide-react";
import { ServiceRanking } from "@/shared/types/business-yearly-metrics";

export default function TopServices({
  services,
}: {
  services: ServiceRanking[];
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
        {services.map((service, index) => (
          <div key={index} className="flex items-center gap-4 flex-wrap">
            <div className="grid gap-1 w-2/3">
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
        ))}
      </CardContent>
    </Card>
  );
}
