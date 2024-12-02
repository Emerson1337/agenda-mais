import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopTenClient } from "@/shared/types/business-monthly-metrics";
import { numberUtils } from "@/shared/utils/numberUtils";
import { stringUtils } from "@/shared/utils/stringUtils";
import { Trophy } from "lucide-react";

export default function TopClients({ clients }: { clients: TopTenClient[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex gap-3">
          <Trophy className="w-4 h-4" /> <span>Ranking de clientes</span>
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
              <div className="ml-auto font-medium">
                {client.totalValue
                  ? numberUtils.convertToMonetaryBRL(Number(client.totalValue))
                  : 0}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            Sem histórico de clientes
          </p>
        )}
      </CardContent>
    </Card>
  );
}
