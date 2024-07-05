"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DaysExceptionModal } from "./DaysExceptionModal";
import {
  format,
  isSameDay,
  parseISO,
  startOfDay,
  startOfToday,
} from "date-fns";
import { dateUtils } from "@/shared/utils/dateUtils";
import { DateExceptions } from "@/private/agenda/domain/schedule.schema";

export interface SchedulesCalendarProps {
  times: string[];
  onConfirm: (exception: { date: string; times: string[] }) => void;
  onDismiss: (exception: { date: string }) => void;
  defaultValue?: DateExceptions[];
}

export function SchedulesCalendar({
  onConfirm,
  times,
  onDismiss,
  defaultValue,
}: SchedulesCalendarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [dates, setDates] = useState<Date[]>(
    defaultValue?.map((value) => startOfDay(parseISO(value.date))) ?? []
  );

  const [exceptionDate, setExceptionDate] = useState<Date | undefined>();

  return (
    <>
      <Calendar
        mode="multiple"
        disabled={dateUtils.getPastDaysFromToday()}
        selected={dates}
        fromDate={startOfToday()}
        fromMonth={startOfToday()}
        onDayClick={(datum) => {
          if (!datum) return;

          if (dates.some((date) => isSameDay(date, datum))) {
            setDates(dates.filter((date) => !isSameDay(date, datum)));
            onDismiss({
              date: format(datum, "yyyy-MM-dd"),
            });
            return setExceptionDate(undefined);
          }

          setExceptionDate(startOfDay(datum));
          setOpen(true);
        }}
        onSelect={(datum) => {
          datum && setDates(datum);
        }}
        className="rounded-md border"
      />

      {exceptionDate && (
        <DaysExceptionModal
          date={exceptionDate}
          times={times}
          open={open}
          onConfirm={(timesAvailable: string[]) => {
            exceptionDate &&
              onConfirm({
                date: format(exceptionDate, "yyyy-MM-dd"),
                times: timesAvailable,
              });
            setOpen(false);
          }}
          dismiss={(exceptionDate) => {
            setDates(
              dates.filter(
                (date) => exceptionDate && !isSameDay(date, exceptionDate)
              )
            );
            exceptionDate &&
              onDismiss({
                date: format(exceptionDate, "yyyy-MM-dd"),
              });
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
