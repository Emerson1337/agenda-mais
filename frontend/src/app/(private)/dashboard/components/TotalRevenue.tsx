import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TotalRevenueProps {
  isLoading?: boolean;
  title: string;
  value: string;
  description: string;
}

export default function TotalRevenue({
  title,
  value,
  description,
  isLoading = false,
}: TotalRevenueProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {isLoading ? (
          <div className="animate-pulse flex items-center space-x-2">
            <div className="h-4 w-20 bg-muted-foreground rounded"></div>
            <div className="h-4 w-4 bg-muted-foreground rounded"></div>
          </div>
        ) : (
          <>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-muted-foreground rounded w-3/4"></div>
            <div className="h-3 bg-muted-foreground rounded w-1/2"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
