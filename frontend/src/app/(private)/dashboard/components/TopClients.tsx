import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberUtils } from "@/shared/utils/numberUtils";
import { stringUtils } from "@/shared/utils/stringUtils";
import { Trophy } from "lucide-react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { TopTenClient } from "@/shared/types/business-total-metrics";

export default function TopClients({
  clients,
  emptyState,
  title,
}: {
  title: string;
  clients: TopTenClient[];
  emptyState: string;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex gap-3">
          <Trophy className="w-4 h-4" /> <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {clients.length ? (
          clients.map((client, index) => (
            <div key={index} className="flex items-center gap-4 flex-wrap">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {client.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stringUtils.addPhoneMask(client.phone)}
                </p>
              </div>
              <div className="ml-auto font-medium flex flex-col items-end">
                <span>
                  {client.totalValue
                    ? numberUtils.convertToMonetaryBRL(
                        Number(client.totalValue),
                      )
                    : 0}
                </span>
                <span className="text-sm text-muted-foreground">
                  Agendamentos: {client.totalAppointments}
                </span>
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
