import { ThemeColors, ThemeStrings } from "@/registry/registry-colors";

/**
 * Extracts the base color from a given theme string.
 *
 * @param theme - The theme string to extract the base color from. It should follow the format "theme-{color}".
 * @returns The extracted base color as a `ThemeColors` type. If the theme string does not match the expected format, it defaults to "zinc".
 */
export const extractBaseColorFromTheme = (theme: ThemeStrings): ThemeColors => {
  const match = theme.match(/^theme-(.+)$/);
  const themeColor = match ? (match[1] as ThemeColors) : "zinc";
  return themeColor;
};
