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
import { useScheduleMutation } from "@/private/schedule/application/hooks/useScheduleMutation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { WeekdaysCards } from "./WeekdaysCards";
import { TimesSelector } from "./TimesSelector";
import { TimeRangeSelector } from "./TimeRangeSelector";
import {
  ScheduleData,
  scheduleFormSchema,
} from "@/private/schedule/domain/schedule.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateSchedule() {
  const form = useForm<ScheduleData>({
    resolver: zodResolver(scheduleFormSchema),
  });
  const { getValues, watch } = form;
  const [times, weekDays, timeRange] = watch([
    "times",
    "weekDays",
    "timeRange",
  ]);
  const isSubmitEnabled = weekDays?.length && !!times?.length;
  const { mutate, isPending, isSuccess, error } = useScheduleMutation();

  function onSubmit() {
    console.log(`🟢🟢🟢 ${JSON.stringify(getValues())} 🟢🟢🟢`);
    mutate(getValues());
  }

  useEffect(() => {
    isSuccess && toast.success("Agenda salva com sucesso!");
    error?.message && toast.error(error?.message);
  }, [error?.message, isSuccess]);

  return (
    <CustomForm
      form={form}
      onSubmit={onSubmit}
      className="space-y-8 max-w-screen-md"
    >
      <Card>
        <CardHeader>
          <CardTitle>Atualizar agenda</CardTitle>
          <CardDescription>
            Para quais dias da semana você deseja deixar a agenda aberta?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WeekdaysCards defaultValue={weekDays} />
          {!!weekDays?.length && (
            <>
              <TimeRangeSelector
                defaultValue={{
                  start: "",
                  end: "",
                }}
              />
              {timeRange?.start && timeRange?.end && <TimesSelector />}
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
