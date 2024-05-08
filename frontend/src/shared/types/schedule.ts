export interface IDateExceptions {
  date: string;
  times: string[];
}

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
