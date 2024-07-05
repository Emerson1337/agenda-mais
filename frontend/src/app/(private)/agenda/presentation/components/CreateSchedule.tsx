"use client";

import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CustomForm } from "@/components/ui/form";
import { useScheduleMutation } from "@/private/agenda/application/hooks/useScheduleMutation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { WeekdaysCards } from "./WeekdaysCards";
import { TimesSelector } from "./TimesSelector";
import { TimeRangeSelector } from "./TimeRangeSelector";
import {
  ScheduleData,
  scheduleFormSchema,
} from "@/private/agenda/domain/schedule.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MonthsAheadSelector } from "./MonthsAheadSelector";
import { useGetScheduleQuery } from "@/private/agenda/infrastructure/schedule.api";

export default function CreateSchedule() {
  const { mutate, isPending, isSuccess, error } = useScheduleMutation();
  const { data, isFetching } = useGetScheduleQuery();
  const form = useForm<ScheduleData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: data,
  });
  const { getValues, watch } = form;
  const [times, weekDays, timeRange, monthsAhead] = watch([
    "times",
    "weekDays",
    "timeRange",
    "monthsAhead",
  ]);

  const isSubmitEnabled =
    weekDays?.length && !!times?.length && monthsAhead !== undefined;

  function onSubmit() {
    mutate(getValues());
  }

  useEffect(() => {
    isSuccess && toast.success("Agenda salva com sucesso!");
    error?.message && toast.error(error?.message);
  }, [error?.message, isSuccess]);

  useEffect(() => {
    // Reset the form whenever data changes
    form.reset(data);
  }, [form, data]);

  if (isFetching) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;

  const title = data ? "Atualizar agenda" : "Criar agenda";

  return (
    <CustomForm
      form={form}
      onSubmit={onSubmit}
      className="space-y-8 max-w-screen-md"
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            Para quais dias da semana você deseja deixar a agenda aberta?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WeekdaysCards defaultValue={weekDays} />
          {!!weekDays?.length && (
            <>
              <TimeRangeSelector defaultValue={timeRange} />
              {timeRange?.start && timeRange?.end && (
                <TimesSelector defaultValue={times} />
              )}
              {timeRange?.start && timeRange?.end && (
                <MonthsAheadSelector defaultValue={monthsAhead} />
              )}
            </>
          )}
        </CardContent>
        <div className="flex justify-center mb-4 items-center">
          <Button
            disabled={!isSubmitEnabled || isPending}
            className="text-foreground w-28"
            type="submit"
          >
            Salvar
          </Button>
        </div>
        <CardFooter className="flex justify-center h-10">
          {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        </CardFooter>
      </Card>
    </CustomForm>
  );
}
