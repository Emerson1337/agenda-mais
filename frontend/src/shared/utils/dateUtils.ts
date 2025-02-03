import { startOfToday, subDays, format, parseISO } from "date-fns";
import { DateExceptions } from "@/app/(private)/agenda/schemas/schedule.schema";
import { ptBR } from "date-fns/locale";

export namespace dateUtils {
  export const getTimes = (
    startTime: string,
    endTime: string,
    interval: number,
  ): string[] => {
    const times: string[] = [];

    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    let currentTime = startHours * 60 + startMinutes; // Convert start time to minutes
    const endTimeMinutes = endHours * 60 + endMinutes; // Convert end time to minutes

    while (currentTime <= endTimeMinutes) {
      const hours = Math.floor(currentTime / 60);
      const minutes = currentTime % 60;
      times.push(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
      );
      currentTime += interval;
    }

    return times;
  };

  export const sortByDate = (array: DateExceptions[]): DateExceptions[] => {
    return array.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  };

  export const sortTimes = (array: string[]): string[] => {
    return array.sort((a, b) => {
      const [aHours, aMinutes] = a.split(":").map(Number);
      const [bHours, bMinutes] = b.split(":").map(Number);
      return aHours - bHours || aMinutes - bMinutes;
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

  export const convertToTime = (durationInMinutes: number): string => {
    if (durationInMinutes < 60) {
      return `${durationInMinutes} minuto${durationInMinutes !== 1 ? "s" : ""}`;
    } else {
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;
      const hourString = `${hours} hora${hours !== 1 ? "s" : ""}`;
      const minuteString =
        minutes > 0 ? ` ${minutes} minuto${minutes !== 1 ? "s" : ""}` : "";
      return `${hourString}${minuteString}`;
    }
  };

  export const formatToDDMMYYYY = (date: string | Date): string => {
    const dateParsed = typeof date === "string" ? parseISO(date) : date;

    return format(dateParsed, "dd/MM/yyyy", { locale: ptBR });
  };
}
