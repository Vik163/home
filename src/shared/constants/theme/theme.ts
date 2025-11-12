import { palette } from "./palette";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: palette.black,
    background: palette.lightGrey,
    bgBtn: palette.white,
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    empty: palette.transparent,
    backgroundDefault: palette.white,
    // navigation
    primary: palette.azureRadiance,
    card: palette.white,
    border: palette.black,
    error: palette.darkRed,
    active: palette.darkGreen,
  },
  dark: {
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    bgBtn: palette.black,
    tabIconSelected: tintColorDark,
    empty: palette.transparent,
    backgroundDefault: palette.black,
    primary: palette.azureRadiance,
    background: palette.black,
    card: palette.codGray,
    text: palette.lightBlue,
    border: palette.lightBlue,
    error: palette.lightRed,
    active: palette.lightGreen,
  },
};
