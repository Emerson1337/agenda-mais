import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { dateUtils } from "@/shared/utils/dateUtils";
import { useFormContext } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { TimesExceptionSelector } from "./TimesExceptionSelector";
import { ScheduleData } from "@/app/(private)/agenda/schemas/schedule.schema";
import React from "react";

interface Props {
  defaultValue: string[];
}

export function TimesSelector({ defaultValue }: Props) {
  const { setValue, watch } = useFormContext<ScheduleData>();
  const [timeRange, gapTimeInMinutes] = watch(["timeRange", "gapTimeInMinutes"]);
  const [times, setTimes] = useState<string[]>(defaultValue ?? []);

  const getTimesInRange = useCallback(() => {
    if (!timeRange || !timeRange.start || !timeRange.end) return [];

    return dateUtils.getTimes(timeRange.start, timeRange.end, gapTimeInMinutes);
  }, [timeRange, gapTimeInMinutes]);

  useEffect(() => {
    const timesRange = getTimesInRange();
    setValue("times", timesRange);
    setTimes(timesRange);
  }, [getTimesInRange, setValue]);

  return (
    <>
      <div className="justify-center flex gap-4 mb-10">
        <TimesCards timesInRangeSelected={times} />
      </div>
      <TimesExceptionSelector />
    </>
  );
}

const TimesCards = ({
  timesInRangeSelected,
}: {
  timesInRangeSelected: string[];
}) => {
  const { setValue } = useFormContext();

  if (!timesInRangeSelected.length) return <></>;

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      className="justify-center max-w-screen-sm"
      defaultValue={timesInRangeSelected}
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
              <div className="size-4 bg-primary rounded-full" /><span>Selecionado</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="size-4 border border-primary bg-background rounded-full" /><span>Não selecionado</span>
            </div>
          </div>
        </div>
        {timesInRangeSelected.map((time, key) => (
          <ToggleGroupItem className="m-1" key={key} value={time}>
            {time}
          </ToggleGroupItem>
        ))}
      </div>
    </ToggleGroup>
  );
};
