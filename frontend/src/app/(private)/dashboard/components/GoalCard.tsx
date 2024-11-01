import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Props {
  title: string;
  value: string;
  description: string;
  progress: number;
  isLoading?: boolean;
}

export default function GoalCard({
  title,
  description,
  progress,
  value,
  isLoading = false,
}: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted-foreground rounded w-1/3"></div>
            <div className="h-8 bg-muted-foreground rounded w-1/2"></div>
          </div>
        ) : (
          <>
            <CardDescription>{title}</CardDescription>
            <CardTitle className="text-4xl">{value}</CardTitle>
          </>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse h-3 bg-muted-foreground rounded w-full"></div>
        ) : (
          <div className="text-xs text-muted-foreground">{description}</div>
        )}
      </CardContent>
      <CardFooter>
        {isLoading ? (
          <div className="animate-pulse h-2.5 bg-muted-foreground rounded-full w-full"></div>
        ) : (
          <Progress value={progress} aria-label={`${progress}% increase`} />
        )}
      </CardFooter>
    </Card>
  );
}
