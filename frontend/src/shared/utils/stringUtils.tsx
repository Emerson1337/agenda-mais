export namespace stringUtils {
  export const getHourNumber = (time: string): number => {
    const timeHour = time.split(":")[0];
    return Number(timeHour);
  };
}
