import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { dateUtils } from "@/shared/utils/dateUtils";
import { useFormContext } from "react-hook-form";
import { stringUtils } from "@/shared/utils/stringUtils";
import { useCallback, useEffect } from "react";
import { TimesExceptionSelector } from "./TimesExceptionSelector";
import { ScheduleData } from "@/private/schedule/domain/schedule.schema";

export function TimesSelector() {
  const { setValue, watch } = useFormContext<ScheduleData>();
  const [timeRange] = watch(["timeRange"]);

  const getTimesInRange = useCallback(() => {
    if (!timeRange || !timeRange.start || !timeRange.end) return [];

    const hourStart = stringUtils.getHourNumber(timeRange.start);
    const hourEnd = stringUtils.getHourNumber(timeRange.end);

    return dateUtils.getTimes(hourStart, hourEnd);
  }, [timeRange]);

  useEffect(() => {
    setValue("times", getTimesInRange());
  }, [getTimesInRange, setValue]);

  return (
    <>
      <div className="justify-center flex gap-4 mb-10">
        <TimesCards timesInRangeSelected={getTimesInRange()} />
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
