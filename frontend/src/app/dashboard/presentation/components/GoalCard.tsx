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
}

export default function GoalCard({
  title,
  description,
  progress,
  value,
}: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
      <CardFooter>
        <Progress value={progress} aria-label={`${progress}% increase`} />
      </CardFooter>
    </Card>
  );
}
