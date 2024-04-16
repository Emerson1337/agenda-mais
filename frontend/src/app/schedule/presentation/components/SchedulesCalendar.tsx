"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export interface SchedulesCalendarProps {}

export function SchedulesCalendar({}: SchedulesCalendarProps) {
  // const [date, setDate] = useState<
  //   | {
  //       from: Date;
  //       to: Date;
  //     }
  //   | undefined
  // >({
  //   from: new Date(),
  //   to: new Date(),
  // });

  const [date, setDate] = useState<Date>(new Date());

  return (
    <>
      {/* <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      /> */}
    </>
  );
}
