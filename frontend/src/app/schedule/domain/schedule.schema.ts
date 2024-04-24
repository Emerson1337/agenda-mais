"use client";

import { z } from "zod";

export const scheduleFormSchema = z.object({
  weekdays: z.array(z.string()).min(1).max(7),
});
export type ScheduleData = z.infer<typeof scheduleFormSchema>;
