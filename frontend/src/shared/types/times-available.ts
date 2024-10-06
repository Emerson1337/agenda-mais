export interface Slot {
  date: string;
  times: string[];
}

export interface BusinessSchedule {
  scheduleId: string;
  slots: Slot[];
}
