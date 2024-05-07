export interface IDateExceptions {
  date: string;
  times: string[];
}

export interface ITimeRange {
  start: string;
  end: string;
}

export type IScheduleRequest = {
  weekDays: string[];
  timeRange: ITimeRange;
  times: string[];
  exceptions: IDateExceptions[];
};

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
