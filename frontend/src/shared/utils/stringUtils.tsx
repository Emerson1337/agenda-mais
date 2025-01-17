export namespace stringUtils {
  export const getHourNumber = (time: string): number => {
    const timeHour = time.split(":")[0];
    return Number(timeHour);
  };
  export const addPhoneMask = (phone: string): string => {
    return phone
      .replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "($2) $3-$4")
      .replace("+", "");
  };
  export const formatBusinessNameForURL = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-zA-Z\s]/g, "") // Remove non-letter characters (no numbers or special symbols)
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  };
}

export const copyToClipboard = (formattedName: string) => {
  navigator.clipboard.writeText(
    `${process.env.NEXT_PUBLIC_BASE_URL}/b/${formattedName}`,
  );
};
