"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export const description = "A multiple bar chart";

export function MultipleBarChartComponent({
  data,
  config,
  title,
  emptyState,
  label,
  descriptionTitle,
  description,
  className,
}: {
  config: ChartConfig;
  data: { label: string; value: number; alternativeValue?: number }[];
  title: string;
  label: string;
  emptyState: string;
  descriptionTitle: string;
  description: string;
  className?: string;
}) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{label}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          {data.length ? (
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="capitalize"
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="capitalize w-[150px]"
                    indicator="dashed"
                  />
                }
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
              <Bar
                dataKey="alternativeValue"
                fill="var(--color-alternativeValue)"
                radius={4}
              />
            </BarChart>
          ) : (
            <div className="flex items-center text-xs justify-center gap-2 h-full text-muted-foreground">
              <InfoCircledIcon className="h-4 w-4" />
              <span>{emptyState}</span>
            </div>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {descriptionTitle} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{description}</div>
      </CardFooter>
    </Card>
  );
}
