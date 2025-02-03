import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";
import { ScheduleData } from "@/app/(private)/agenda/schemas/schedule.schema";
import { useCallback, useEffect } from "react";
import { dateUtils } from "@/shared/utils/dateUtils";

export interface GapTimeSelectorProps {
  onChange?: (value: number) => void;
  defaultValue?: number;
}

export function GapTimeSelector({
  onChange,
  defaultValue,
}: GapTimeSelectorProps) {
  const { setValue, getValues } = useFormContext<ScheduleData>();

  const gaps = [];

  for (let index = 15; index <= 120; index += 15) {
    const hours = Math.floor(index / 60);
    const minutes = index % 60;
    gaps.push({
      id: index,
      label: `${hours > 0 ? `${hours} hora${hours > 1 ? "s" : ""}` : ""}${hours > 0 && minutes > 0 ? " e " : ""}${minutes > 0 ? `${minutes} minuto${minutes > 1 ? "s" : ""}` : ""}`,
    });
  }

  const allTimesPossible = useCallback(() => {
    return dateUtils.getTimes("00:00", "23:00", getValues("gapTimeInMinutes"));
  }, [defaultValue]);

  const parseTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  useEffect(() => {
    const defaultValueStart =
      !getValues("timeRange")?.start ||
      allTimesPossible().includes(getValues("timeRange")?.start)
        ? getValues("timeRange")?.start
        : allTimesPossible().find(
            (time) => parseTimeToMinutes(time) >= parseTimeToMinutes("06:00"),
          );

    const defaultValueEnd =
      !getValues("timeRange")?.end ||
      allTimesPossible().includes(getValues("timeRange").end)
        ? getValues("timeRange")?.end
        : allTimesPossible().findLast(
            (time) => parseTimeToMinutes(time) <= parseTimeToMinutes("19:00"),
          );

    defaultValueStart &&
      setValue("timeRange", {
        ...getValues("timeRange"),
        start: defaultValueStart,
      });
    defaultValueEnd &&
      setValue("timeRange", {
        ...getValues("timeRange"),
        end: defaultValueEnd,
      });
  }, [getValues("gapTimeInMinutes")]);

  return (
    <div className="w-full mt-5 flex gap-4 flex-col text-center justify-center items-center">
      <span>Qual a frequência de horários que você irá atender?</span>
      <Select
        defaultValue={defaultValue ? String(defaultValue) : undefined}
        onValueChange={(value) => {
          setValue("gapTimeInMinutes", Number(value));
          onChange?.(Number(value));
        }}
      >
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Tempo de atendimento:" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {gaps.map((item, key) => (
              <SelectItem key={key} value={String(item.id)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
