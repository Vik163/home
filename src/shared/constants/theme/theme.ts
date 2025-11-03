import { palette } from "./theme.palette";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    empty: palette.transparent,
    backgroundDefault: palette.white,
    // navigation
    primary: palette.azureRadiance,
    card: palette.white,
    border: palette.alto,
    notification: palette.redOrange,
  },
  dark: {
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    empty: palette.transparent,
    backgroundDefault: palette.black,
    primary: palette.azureRadiance,
    background: palette.black,
    card: palette.codGray,
    text: palette.iron,
    border: palette.shark,
    notification: palette.redOrange,
  },
};
