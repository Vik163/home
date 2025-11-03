import { Theme, ThemeScheme } from "@/shared/types/theme";
import { Colors } from "./theme";

export const themes: {
  [key in NonNullable<ThemeScheme>]: Theme;
} = {
  light: {
    colors: Colors.light,
  },
  dark: {
    ...Colors.light,
    colors: Colors.dark,
  },
};
