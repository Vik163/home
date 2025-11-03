import { Colors } from "../constants/theme/theme";

export type Colors = keyof typeof Colors.light;

export interface Theme {
  colors: { [key in Colors]: string };
}

export type ThemeScheme = "light" | "dark";
