"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "A stacked area chart";

export function AreaChartComponent({
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
  emptyState: string;
  data: { label: string; value: number; alternativeValue?: number }[];
  title: string;
  label: string;
  descriptionTitle: string;
  description: string;
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{label}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          {data.length ? (
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent className="w-[150px]" indicator="dot" />
                }
              />
              <Area
                dataKey="value"
                type="natural"
                fill="var(--color-value)"
                fillOpacity={0.4}
                stroke="var(--color-value)"
                stackId="a"
              />
              <Area
                dataKey="alternativeValue"
                type="natural"
                fill="var(--color-alternativeValue)"
                fillOpacity={0.4}
                stroke="var(--color-alternativeValue)"
                stackId="a"
              />
            </AreaChart>
          ) : (
            <div className="flex items-center text-xs justify-center gap-2 h-full text-muted-foreground">
              <InfoCircledIcon className="h-4 w-4" />
              <span>{emptyState}</span>
            </div>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-5">
              {descriptionTitle} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground leading-5">
              {description}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
