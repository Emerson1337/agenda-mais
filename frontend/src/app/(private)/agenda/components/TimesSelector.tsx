import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { dateUtils } from "@/shared/utils/dateUtils";
import { useFormContext } from "react-hook-form";
import { useCallback, useEffect, useRef } from "react";
import { TimesExceptionSelector } from "./TimesExceptionSelector";
import { ScheduleData } from "@/app/(private)/agenda/schemas/schedule.schema";
import React from "react";

export function TimesSelector() {
  const { setValue, watch } = useFormContext<ScheduleData>();
  const [timeRange, gapTimeInMinutes, defaultTimes] = watch([
    "timeRange",
    "gapTimeInMinutes",
    "times",
  ]);

  const prevTimeRange = useRef(timeRange);
  const prevGapTimeInMinutes = useRef(gapTimeInMinutes);

  const getTimesInRange = useCallback(() => {
    if (!timeRange?.start || !timeRange?.end || !gapTimeInMinutes) return [];

    const timesInRange = dateUtils.getTimes(
      timeRange.start,
      timeRange.end,
      gapTimeInMinutes,
    );

    return timesInRange;
  }, [timeRange, gapTimeInMinutes]);

  useEffect(() => {
    if (
      prevTimeRange.current?.start !== timeRange?.start ||
      prevTimeRange.current?.end !== timeRange?.end ||
      prevGapTimeInMinutes.current !== gapTimeInMinutes
    ) {
      const timesInRange = getTimesInRange();
      setValue("times", timesInRange);

      // Update refs after the first run
      prevTimeRange.current = timeRange;
      prevGapTimeInMinutes.current = gapTimeInMinutes;
    }
  }, [timeRange, gapTimeInMinutes, getTimesInRange, setValue]);

  return (
    <>
      <div className="justify-center flex gap-4 mb-10">
        <ToggleGroup
          id="times"
          type="multiple"
          variant="outline"
          className="justify-center max-w-screen-sm"
          value={defaultTimes}
          onValueChange={(values) => {
            setValue("times", values);
          }}
        >
          <div className="flex-row text-center">
            <div className="my-4">
              <p>Esses são os horários que você pré-definiu.</p>
              <p>
                Agora, selecione os horários que deseja disponibilizar para
                agendamento.
              </p>
              <div className="flex gap-8 justify-center w-full mt-8">
                <div className="flex gap-2 items-center">
                  <div className="size-4 bg-primary rounded-full" />
                  <span className="text-sm text-muted-foreground ">
                    Selecionado
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="size-4 border border-primary bg-background rounded-full" />
                  <span className="text-sm text-muted-foreground ">
                    Não selecionado
                  </span>
                </div>
              </div>
            </div>
            {getTimesInRange().length ? (
              getTimesInRange().map((time, key) => (
                <ToggleGroupItem
                  className="m-1 border-primary"
                  key={key}
                  value={time}
                >
                  {time}
                </ToggleGroupItem>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                Selecione o seu horário de atendimento acima para selecionar os
                horários.
              </span>
            )}
          </div>
        </ToggleGroup>
      </div>
      <TimesExceptionSelector />
    </>
  );
}
