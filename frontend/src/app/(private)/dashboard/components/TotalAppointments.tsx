import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TotalAppointmentsProps {
  isLoading?: boolean;
  title: string;
  value: string;
  description: string;
}

export default function TotalAppointments({
  description,
  title,
  value,
  isLoading = false,
}: TotalAppointmentsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {isLoading ? (
          <div className="animate-pulse flex items-center space-x-2">
            <div className="h-4 w-24 bg-muted-foreground rounded"></div>
            <div className="h-4 w-4 bg-muted-foreground rounded"></div>
          </div>
        ) : (
          <>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
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
          <>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
