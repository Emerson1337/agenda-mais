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

      return (
        new Date(dayA, monthA, yearA).getTime() -
        new Date(dayB, monthB, yearB).getTime()
      );
    });
  };
}
