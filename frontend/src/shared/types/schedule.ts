import {
  TimeRange,
  DateExceptions,
} from "@/private/schedule/domain/schedule.schema";

export type IScheduleResponse = {
  body: IBody;
};

export type IBody = {
  date: Date;
  times: ITime[];
  managerId: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
};

export type ITime = {
  time: string;
  available: boolean;
};

export type IScheduleRequest = {
  weekDays: number[];
  timeRange: TimeRange;
  times: string[];
  dateExceptions: DateExceptions[];
  monthsAhead: number;
};
