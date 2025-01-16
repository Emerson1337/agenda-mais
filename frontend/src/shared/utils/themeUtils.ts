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

export const hslToHex = (h: string, s: string, l: string) => {
  let sNumber = Number(s.split("%")[0]);
  let hNumber = Number(h.split("%")[0]);
  let lNumber = Number(l.split("%")[0]);

  sNumber /= 100;
  lNumber /= 100;

  const c = (1 - Math.abs(2 * lNumber - 1)) * sNumber;
  const x = c * (1 - Math.abs(((hNumber / 60) % 2) - 1));
  const m = lNumber - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (hNumber >= 0 && hNumber < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (hNumber >= 60 && hNumber < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (hNumber >= 120 && hNumber < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (hNumber >= 180 && hNumber < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (hNumber >= 240 && hNumber < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (hNumber >= 300 && hNumber < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Convert to 0-255 range
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  // Convert to hex
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
