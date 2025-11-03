import { Platform } from "react-native";
import { fluidType } from "../lib";

export const fontFamily = {
  roboto: "roboto",
};

export const fontWeights = {
  regular: "regular",
  medium: "medium",
  bold: "bold",
};

export const fontNames = {
  roboto: {
    regular: undefined,
    medium: undefined,
    bold: undefined,
  },
};

export const fontSizes = {
  xxSmall: fluidType({ min: 10, max: 12 }),
  xSmall: fluidType({ min: 12, max: 14 }),
  small: fluidType({ min: 14, max: 16 }),
  medium: fluidType({ min: 16, max: 18 }),
  large: fluidType({ min: 20, max: 22 }),
  xLarge: fluidType({ min: 24, max: 26 }),
  xxLarge: fluidType({ min: 32, max: 34 }),
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
