import { IDateExceptions } from "@/shared/types/schedule";

export namespace dateUtils {
  export const getTimes = (start: number, end: number): string[] => {
    const times = [];

    for (let index = start; index <= end; index++) {
      times.push(`${index < 10 ? "0" + index : index}:00`);
    }

    return times;
  };

  export const sortByDate = (array: IDateExceptions[]): IDateExceptions[] => {
    return array.sort((a: IDateExceptions, b: IDateExceptions) => {
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
    const today = new Date();

    // Iterate over the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date);
    }

    return dates;
  };
}
