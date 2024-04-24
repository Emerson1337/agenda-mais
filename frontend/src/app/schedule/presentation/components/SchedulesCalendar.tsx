"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DaysExceptionModal } from "./DaysExceptionModal";
import { format } from "date-fns";

export interface SchedulesCalendarProps {
  times: string[];
  onConfirm: (exception: { date: string; times: string[] }) => void;
  onDismiss: (exception: { date: string }) => void;
}

export function SchedulesCalendar({
  onConfirm,
  times,
  onDismiss,
}: SchedulesCalendarProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [dates, setDates] = useState<Date[]>([]);

  const [exceptionDate, setExceptionDate] = useState<Date | undefined>();

  return (
    <>
      <Calendar
        mode="multiple"
        selected={dates}
        fromDate={new Date()}
        fromMonth={new Date()}
        onDayClick={(datum) => {
          if (!datum) return;

          if (dates.some((date) => date.getTime() === datum.getTime())) {
            setDates(
              dates.filter((date) => date.getTime() !== datum?.getTime())
            );
            onDismiss({
              date: format(datum, "dd/MM/yyyy"),
            });
            return setExceptionDate(undefined);
          }

          setExceptionDate(datum);
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
                date: format(exceptionDate, "dd/MM/yyyy"),
                times: timesAvailable,
              });
            setOpen(false);
          }}
          dismiss={(exceptionDate) => {
            setDates(
              dates.filter(
                (date) => date.getTime() !== exceptionDate?.getTime()
              )
            );
            exceptionDate &&
              onDismiss({
                date: format(exceptionDate, "dd/MM/yyyy"),
              });
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
