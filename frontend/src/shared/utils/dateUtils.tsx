export namespace dateUtils {
  export const getTimes = (start: number, end: number): string[] => {
    const times = [];

    for (let index = start; index <= end; index++) {
      times.push(`${index < 10 ? "0" + index : index}:00`);
    }

    return times;
  };
}
