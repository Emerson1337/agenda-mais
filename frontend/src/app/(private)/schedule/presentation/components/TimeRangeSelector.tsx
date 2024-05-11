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
import { stringUtils } from "@/shared/utils/stringUtils";
import { TimeRange } from "@/private/schedule/domain/schedule.schema";

export interface TimeRangeSelectorProps {
  defaultValue?: TimeRange;
  onChange?: (value: TimeRange) => void;
}

export function TimeRangeSelector({
  onChange,
  defaultValue,
}: TimeRangeSelectorProps) {
  const { setValue, getValues } = useFormContext();

  const allTimes = dateUtils.getTimes(stringUtils.getHourNumber("00:00"), 23);

  const allTimesPossible = dateUtils.getTimes(
    stringUtils.getHourNumber(getValues().timeRange?.start ?? "00:00"),
    23
  );

  return (
    <>
      <div className="flex justify-center gap-4 mt-10 mb-5">
        <div>Qual será o seu horário de atendimento?</div>
      </div>
      <div className="flex gap-4 justify-center mb-10">
        <Select
          defaultValue={defaultValue?.start}
          onValueChange={(value) => {
            setValue("timeRange", { ...getValues().timeRange, start: value });
            onChange?.({ ...getValues().timeRange, start: value });
          }}
        >
          <SelectTrigger className="w-28">
            <SelectValue placeholder="De" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {allTimes.map((time, key) => (
                <SelectItem key={key} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          defaultValue={defaultValue?.end}
          onValueChange={(value) => {
            setValue("timeRange", { ...getValues().timeRange, end: value });
            onChange?.({ ...getValues().timeRange, end: value });
          }}
        >
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Até" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {allTimesPossible.map((time, key) => (
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
