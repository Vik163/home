import { fontFamily, fontSizes, fontWeights } from "../constants/fonts";

export type FontSizes = keyof typeof fontSizes;
export type FontWeights = keyof typeof fontWeights;
export type FontFamily = keyof typeof fontFamily;
type FontNames = {
  [key in FontWeights]: string | undefined;
};

export interface Fonts {
  fontWeights?: {
    [key in FontWeights]: string;
  };
  fontFamily?: { [key in FontFamily]: string };
  fontNames?: {
    [key in FontFamily]: FontNames;
  };
  fontSizes?: { [key in FontSizes]: number };
}
