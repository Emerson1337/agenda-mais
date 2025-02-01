import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { dateUtils } from "@/shared/utils/dateUtils";
import { TimeRange } from "@/app/(private)/agenda/schemas/schedule.schema";
import { useCallback, useEffect, useState } from "react";

export interface TimeRangeSelectorProps {
  defaultValue?: TimeRange;
  onChange?: (value: TimeRange) => void;
}

export function TimeRangeSelector({
  onChange,
  defaultValue,
}: TimeRangeSelectorProps) {
  const { setValue, getValues } = useFormContext();

  const allTimesPossible = useCallback(() => {
    return dateUtils.getTimes("00:00", "23:00", getValues("gapTimeInMinutes"));
  }, [getValues]);

  const [startTime, setStartTime] = useState<string | undefined>(
    defaultValue?.start,
  );
  const [endTime, setEndTime] = useState<string | undefined>(defaultValue?.end);

  useEffect(() => {
    setStartTime(defaultValue?.start);
    setEndTime(defaultValue?.end);
  }, [defaultValue]);

  return (
    <>
      <div className="flex justify-center gap-4 mt-10 mb-5">
        <div>Qual será o seu horário de atendimento?</div>
      </div>
      <div className="flex gap-4 justify-center mb-10">
        <Select
          value={startTime}
          onValueChange={(value) => {
            setStartTime(value);
            setValue("timeRange", { ...getValues().timeRange, start: value });
            onChange?.({ ...getValues().timeRange, start: value });
          }}
        >
          <SelectTrigger className="w-28">
            <SelectValue placeholder="De" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {allTimesPossible().map((time, key) => (
                <SelectItem key={key} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={endTime}
          onValueChange={(value) => {
            setEndTime(value);
            setValue("timeRange", { ...getValues().timeRange, end: value });
            onChange?.({ ...getValues().timeRange, end: value });
          }}
        >
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Até" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {allTimesPossible().map((time, key) => (
                <SelectItem key={key} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
