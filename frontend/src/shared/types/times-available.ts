export interface Slots {
  date: string;
  times: string[];
}

export interface BusinessSchedule {
  scheduleId: string;
  slots: Slots[];
}
