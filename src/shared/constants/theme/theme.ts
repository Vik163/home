import { palette } from "./palette";

export const Colors = {
  light: {
    text: palette.black,
    background: palette.lightGrey,
    bgBtn: palette.white,
    bgModal: palette.black,
    icon: "#687076",
    empty: palette.transparent,
    // navigation
    border: palette.black,
    error: palette.darkRed,
    active: palette.darkGreen,
    link: palette.darkBlue,
    overlay: palette.shark,
    yellow: palette.sun,
  },
  dark: {
    icon: "#9BA1A6",
    bgBtn: palette.black,
    bgModal: palette.blackBlue,
    empty: palette.transparent,
    background: palette.black,
    text: palette.lightBlue,
    border: palette.lightBlue,
    error: palette.lightRed,
    active: palette.lightGreen,
    link: palette.lightBlue,
    overlay: palette.shark,
    yellow: palette.sun,
  },
};
