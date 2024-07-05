import { startOfToday, subDays } from "date-fns";
import { DateExceptions } from "@/private/agenda/domain/schedule.schema";

export namespace dateUtils {
  export const getTimes = (start: number, end: number): string[] => {
    const times = [];

    for (let index = start; index <= end; index++) {
      times.push(`${index < 10 ? "0" + index : index}:00`);
    }

    return times;
  };

  export const sortByDate = (array: DateExceptions[]): DateExceptions[] => {
    return array.sort((a: DateExceptions, b: DateExceptions) => {
      const [dayA, monthA, yearA] = a.date.split("/").map(Number);
      const [dayB, monthB, yearB] = b.date.split("/").map(Number);
      // Months are zero-indexed in JavaScript's Date constructor
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);

      // Compare timestamps of the two dates
      return dateA.getTime() - dateB.getTime();
    });
  };

  export const getPastDaysFromToday = (): Date[] => {
    const dates: Date[] = [];
    const today = startOfToday();

    // Iterate over the last 30 days
    for (let i = 1; i < 30; i++) {
      dates.push(subDays(today, i));
    }

    return dates;
  };
}
