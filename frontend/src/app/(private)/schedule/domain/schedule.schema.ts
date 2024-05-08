"use client";

import { z } from "zod";

export const DateExceptionsSchema = z.object({
  date: z.string(),
  times: z.array(z.string()),
});
export type DateExceptions = z.infer<typeof DateExceptionsSchema>;

export const TimeRangeSchema = z.object({
  start: z.string(),
  end: z.string(),
});
export type TimeRange = z.infer<typeof TimeRangeSchema>;

export const scheduleFormSchema = z.object({
  weekDays: z.array(z.string()).min(1).max(7),
  timeRange: TimeRangeSchema,
  times: z.array(z.string()),
  dateExceptions: z.array(DateExceptionsSchema).default([]),
});
export type ScheduleData = z.infer<typeof scheduleFormSchema>;
